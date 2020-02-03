import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quest5Component } from './quest5.component';

describe('Quest5Component', () => {
  let component: Quest5Component;
  let fixture: ComponentFixture<Quest5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quest5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quest5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
