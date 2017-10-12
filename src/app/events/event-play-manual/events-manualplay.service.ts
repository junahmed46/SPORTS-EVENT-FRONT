import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import {environment} from '../../../environments/environment';
import {DatePipe} from '@angular/common';

@Injectable()
export class EventsManualPlayService {

  constructor(private http: Http, private datePipe: DatePipe) {
  }

  fetch_data(event_id, event_current_step): Observable<any>  {
    return this.http.get(environment.api_url + 'athlete-progress/data/' + event_id + '/' + event_current_step, {})
      .catch(error => this.handleError(error));;
  }

  finish_step(code_identifier, finish_type): Observable<any>  {

    const date_obj = new Date();
    const milli_Sec = date_obj.getMilliseconds();
    const clock_time =   this.datePipe.transform(date_obj, 'yyyy-MM-dd HH:mm:ss') + '.' + milli_Sec;

    return this.http.post(environment.api_url + 'test-server', {
      chip_code: code_identifier,
      finish_type: finish_type,
      clock_time: clock_time
    })
      .catch(error => this.handleError(error.json()));
  }

  delete_previous(event_id): Observable<any>  {
    return this.http.delete(environment.api_url + 'destroy-dummy-data/' + event_id , {})
      .catch(error => this.handleError(error.json()));
  }


  get_athlets(event_id): Observable<any>  {
    return this.http.get(environment.api_url + 'sport-event-athletes/' + event_id , {})
      .catch(error => this.handleError(error.json()));
  }

  handleError(error: any) {
    return Observable.throw(error.json());
  }
}


