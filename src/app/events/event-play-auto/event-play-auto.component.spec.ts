import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayAutoComponent } from './event-play-auto.component';

describe('EventPlayAutoComponent', () => {
  let component: EventPlayAutoComponent;
  let fixture: ComponentFixture<EventPlayAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
