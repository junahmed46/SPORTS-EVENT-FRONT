import { Component, OnInit } from '@angular/core';
import {EventsService} from '../events.service';
import {ActivatedRoute} from '@angular/router';
import {SportEventSingle} from '../models/sport-event-single.model';
import {Athlets} from '../models/athlets.model';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
})
export class EventsDetailComponent implements OnInit {
  id: number;
  event_single: Array<SportEventSingle> = [];
  athelets: Array<Athlets> = [];
  public alerts: any = [];

  constructor(private EventObj: EventsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  ngOnInit() {
    /* getting Complete event including Athlets */
    this.get_single_event();
  }

  get_single_event() {
    this.EventObj.get_single_event(this.id).subscribe(response => {
      let res = response.json();
        this.event_single = res.event;
        this.athelets = res.event.sport_event_athlets;
    });
  }

  add_athlets_to_event () {
    this.EventObj.add_athlets_to_event(this.id).subscribe(response => {
      let res = response.json();
      this.event_single = res.event;
      this.athelets = res.event.sport_event_athlets;
      this.alerts.push({
        type: 'success',
        msg: 'Random athlets have been added',
        timeout: 4000
      });
    });
  }
}
