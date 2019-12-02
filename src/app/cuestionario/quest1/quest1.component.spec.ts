import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quest1Component } from './quest1.component';

describe('Quest1Component', () => {
  let component: Quest1Component;
  let fixture: ComponentFixture<Quest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
