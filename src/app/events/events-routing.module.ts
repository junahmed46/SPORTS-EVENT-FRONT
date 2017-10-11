import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './listing/events.component';
import {EventsDetailComponent} from './events-detail/events-detail.component';
import {EventPlayAutoComponent} from './event-play-auto/event-play-auto.component';
import {EventPlayManualComponent} from './event-play-manual/event-play-manual.component';

const routes: Routes = [
  { path : 'events', component: EventsComponent}, /*display all events in desc order*/
  { path : 'event/detail/:id', component: EventsDetailComponent}, /*display Event Detail including atlets*/
  /*Auto Play of event, will insert athlets corridor and finish line timing maunally*/
  { path : 'event/play/auto/:id', component: EventPlayAutoComponent},
  /*ManualPlay of event, user has the option to finish athlet corridor and finish line*/
  { path : 'event/play/manual/:id', component: EventPlayManualComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
