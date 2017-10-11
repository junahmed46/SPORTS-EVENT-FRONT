import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/listing/events.component';
import {HttpModule, RequestOptions} from '@angular/http';
import {EventsModule} from './events/listing/events.module';
import {EventsService} from './events/events.service';
import { AlertModule } from 'ngx-bootstrap';
import { EventsDetailComponent } from './events/events-detail/events-detail.component';
import { EventPlayAutoComponent } from './events/event-play-auto/event-play-auto.component';
import {EventsAutoPlayService} from './events/event-play-auto/events-autoplay.service';
import { EventPlayManualComponent } from './events/event-play-manual/event-play-manual.component';
import {EventsManualPlayService} from './events/event-play-manual/events-manualplay.service';
import {DatePipe} from '@angular/common';
import {NavComponent} from './layout/nav/nav.component';
import {FooterComponent} from './layout/footer/footer.component';
import {Error404Component} from './common/error404/error-404.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    Error404Component,
    EventsComponent,
    EventsDetailComponent,
    EventPlayAutoComponent,
    EventPlayManualComponent
  ],
  imports: [
    BrowserModule,
    EventsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [EventsService, EventsAutoPlayService, EventsManualPlayService, DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }


