import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quest4Component } from './quest4.component';

describe('Quest4Component', () => {
  let component: Quest4Component;
  let fixture: ComponentFixture<Quest4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quest4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quest4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
