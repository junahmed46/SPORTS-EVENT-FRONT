import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './events/listing/events.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' } /*nothing to display on root so diverting to /events */
];
/* Events routes are defined in app/events/events-routings.module.ts */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
