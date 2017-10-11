import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayManualComponent } from './event-play-manual.component';

describe('EventPlayManualComponent', () => {
  let component: EventPlayManualComponent;
  let fixture: ComponentFixture<EventPlayManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
