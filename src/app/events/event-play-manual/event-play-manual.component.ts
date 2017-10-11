import {Component, OnInit, OnDestroy , ElementRef , Renderer2} from '@angular/core';
import {EventsManualPlayService} from './events-manualplay.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AthletResult} from '../models/athlet-result.model';
import {Observable} from 'rxjs/Observable';
import {AthletsManual} from '../models/athlets-manual.model';

@Component({
  selector: 'app-event-play-manual',
  templateUrl: './event-play-manual.component.html',
  styleUrls: ['./event-play-manual.component.less']
})
export class EventPlayManualComponent implements OnInit, OnDestroy {

  /* the purpose of event_current_step is to see which step need to be retrive, this is added for a purpose that if
  1) to over come if browser tab is inative and once ative again all data should not come directly
  2) to keep history, so user can navigate to history
*/
  id: number;
  athlet_result: Array<AthletResult> = [];
  athlet_manual: Array<AthletsManual> = [];
  event_current_step: number;
  event_last_fetched: number; // event_last_fetched is to save last step of fetched data and this give them option to resume from current data or last fetched
  alive: boolean; // alive is here for a reason, it tell that data need to be fetched or not, alive will false once game finish or browser go inactive
  event_finish: boolean; // show event finish or data fetching need to be stopped
  stopped_manually: boolean; // in case user see history etc or any manual stop fetching action, it is here to not start fetching automatically in case of active browser tab etc
  time_format: string; // this is if user want to see time or differnece between time
  e_observable_subcription: Subscription; // obervable to fetch data



  constructor(
    private EventPlayObj: EventsManualPlayService,
    public el: ElementRef,
    public renderer: Renderer2,
    private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.alive = false; // initially false so setup game can insert records etc
    this.event_finish = false; // initially false because game is not going to finish in start
    this.stopped_manually = false; // initially false because no manual action is done
    this.event_current_step = this.event_last_fetched = 1; // by default first and last fetched will be 1
    this.time_format = 'time'; // by default time will show

    /* below i handle browser tabs and browser visibility so if tab is not visible it will stop fetching and will
     * will activate back once tab is visible again
     * fetching will not activate automatically if user perform action like history
     */
    this.renderer.listen('document', 'visibilitychange', (event) => {
      if (document.visibilityState === 'visible') {
        console.log('browser active');
        if (!this.stopped_manually) {
          this.create_obs();
        }
      } else {
        console.log('browser inactive');
        this.destroy_obs();
      }


    });

  }

  /* Game Setup (should be name Event Setup)
  Setup event is little differnet as compared to Automatic here no dummy data will be insert and
  data insertion will depend on user intreation with button
   */

  ngOnInit() {
    // on init setup event is called, in setup_game function it first call to add manually data using server port of adding data
    this.get_athlets();
    this.create_obs();
  }

  /* Create and destory Fetching

  create_obs will start fecthing of data after every 1.5 sec
  we are calling create_obs once game setup or browser tab active or user click fetching action
   */

  create_obs() {
    this.alive = true;
    this.e_observable_subcription = Observable.interval(1500)
      .subscribe(response =>  this.fetch_data());
  }
  /*
  destroy_obs will stop fecthing of data
  we are calling destory_obs once user make any history action, browser inative
  */
  destroy_obs() {
    this.alive = false;
    this.e_observable_subcription.unsubscribe();
  }


  /* The fetched data function is to fetch the data according to step
    this function is wrote separaly because it will be called from many places
    1) while automatic fetching
    2) with previous step button
    3) with next step button
  */
  fetch_data() {
    this.EventPlayObj.fetch_data(this.id, this.event_current_step).subscribe(res => {
      let data = res.json();
      if (data.success == true) {
        this.event_finish = data.event_finish;
        if (data.new_data == true) {
          this.athlet_result = data.data;
          if (this.alive == true && this.event_finish != true) {
            this.event_current_step++;
          }
          this.event_last_fetched = this.event_current_step >= this.event_last_fetched ? this.event_current_step : this.event_last_fetched;
        }
        if (this.event_finish == true) {
          this.destroy_obs();
        }
      }
    });
  }

  /* Next and Previous step is to give detail look or anything user missed, we will be easily able
    to naviagte and data will be according to previous same sorting and highlited TD
    IT WILL ALSO STOPPED FTECHING, IF FETCHING KEPT ACTIVE IT WILL CONFUSE THE USER
  */

  next_step() {
    this.stopped_manually = true;
    this.event_current_step++;
    this.fetch_data();
  }


  previous_step() {
    this.stopped_manually = true;
    this.destroy_obs();
    this.event_current_step--;
    this.fetch_data();

  }

  /* Resume Fetching is supporting function for next and previous step action.
    Attached to Current data and last fetched buttons
    1) with Current data it will start fetching from same place
    2) with last fetched it will start from where Previous button called
  */
  resume_fetching(new_fetch_step) {
    this.stopped_manually = false;
    this.event_current_step =  new_fetch_step;
    this.create_obs();
  }

  /*
  get_athlets will provide the list of athlets and there corridor and finish line crossing done as false and true
  same function is attached with clear previous data
  */
  get_athlets() {
   this.EventPlayObj.get_athlets(this.id).subscribe((res) => {
        const data = res.json();
        this.athlet_manual = data.athlets;
      });
  }

  /* data can be display in two format 1) Time 2) diff
    with diff you will be able to see the diff from the first who enter corridor and for finish line who enter finish line first
  */

  /*
  Delete previous simply all the finish data of specific event as we are keeping history as well
  it will also start fetching its not active
  it will also start fetching even if it is manually stop
  */
  delete_previous () {
    this.EventPlayObj.delete_previous(this.id)
      .subscribe(() => {
        this.event_current_step = this.event_last_fetched = 1;
        this.athlet_result = [];
        this.event_finish = false; // in case event is already over
        if(this.alive == false) // in case event is not alive anymore
          this.create_obs();
        this.stopped_manually = false; // incase manully stop, no need of it anymore as all data will be cleared.
        this.get_athlets();
      });

  }

  /* Finish data is pure Manual page function it is attatched to button to finish corridor and finish line of athlets
  */

  finish_step (code_identifier, finish_type, index) {

    if (finish_type == 'corridor') {
      this.athlet_manual[index].corridor_done = true;
    }

    if (finish_type == 'line') {
      this.athlet_manual[index].line_done = true;
    }

    this.EventPlayObj.finish_step(code_identifier, finish_type).subscribe(response => {
      });
  }


  changetimeformat (type) {
    if ( type == 'time') {
      this.time_format = 'time';
    } else {
      this.time_format = 'diff';
    }
  }

  // as fetching and other things are going on, on destroy all things are deleted or maked default
  ngOnDestroy() {
    this.destroy_obs();
    this.alive = false;
    this.event_finish = false;
    this.stopped_manually = false;
    this.time_format = 'time';
    this.event_current_step = this.event_last_fetched = 1;
  }

}
