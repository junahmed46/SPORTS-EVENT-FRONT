import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import {Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class EventsService {



  constructor(private http: Http) {}
/*** Event Listing Pages Start***/
  /* Get all events */

  get_all_events(): Observable<any> {
    return this.http.get(environment.api_url + 'sport-event', {})
     .catch(this.handleError);
  }

  /* Add event */

  add_event(): Observable<any> {
    return this.http.post(environment.api_url + 'sport-event', {})
      .catch(this.handleError);
  }

/*** Event Listing Pages Ended***/


  /*** Event Listing Detail Start***/
  /* Event with Athlets */

  get_single_event(id: number): Observable<any> {
    return this.http.get(environment.api_url + 'sport-event/' + id, {})
      .catch(this.handleError);
  }


/* Add 10 to 15 Random Athlets to Event */
  add_athlets_to_event (id: number): Observable<any> {
    return this.http.post(environment.api_url + 'sport-event/add-athlets/' + id, {})
      .catch(this.handleError);
  }


  private handleError (error: any) {
    return Observable.throw(error.json());
  }
}


