import { Component, OnInit } from '@angular/core';
import * as global from '../../globals';
import { AlertModule } from 'ngx-bootstrap';
import {EventsService} from '../events.service';
import {Observable} from 'rxjs/Observable';
import {SportEvents} from '../models/sport-events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})

export class EventsComponent implements OnInit {
  public alerts: any = [];
  events: Array<SportEvents> = [];
  testing: Observable<any>;

  constructor(private EventObj: EventsService) {
  }

  ngOnInit() {
    this.get_all_events();
  }

  add_event() {
    this.EventObj.add_event().subscribe(response => {
      let res = response.json();
      this.alerts.push({
        type: 'success',
        msg: `Event has been added successfully added`,
        timeout: 4000
      });
      this.get_all_events();
    });

  }

  get_all_events () {
    this.EventObj.get_all_events().subscribe(response => {
      let res = response.json();
      this.events = res.events;
    });
  }
}





