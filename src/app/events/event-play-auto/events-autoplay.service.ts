import { Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';
import {Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import {environment} from '../../../environments/environment';
import {AthletResult} from '../models/athlet-result.model';


@Injectable()
export class EventsAutoPlayService {

  constructor(private http: Http) {
  }


  setup_game (event_id): Observable<any> {
    return this.http.get(environment.api_url + 'dummy-auto-play/' + event_id, {});
  }






  fetch_data(event_id, event_current_step): Observable<any>  {
    return this.http.get(environment.api_url + 'athlete-progress/data/' + event_id + '/' + event_current_step, {});
  }

}


