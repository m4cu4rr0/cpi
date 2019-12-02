import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Quest2Component } from './quest2.component';

describe('Quest2Component', () => {
  let component: Quest2Component;
  let fixture: ComponentFixture<Quest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Quest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Quest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
