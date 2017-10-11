import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Error404Component} from './common/error404/error-404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' }, /*nothing to display on root so diverting to /events */
  {path: 'page-missing', component: Error404Component},
  // if nothing matched show 404
  {path: '**', redirectTo: '/page-missing' }


];
/* Events routes are defined in app/events/events-routings.module.ts */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
