import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorDetailPage } from './visitor-detail.page';

describe('VisitorDetailPage', () => {
  let component: VisitorDetailPage;
  let fixture: ComponentFixture<VisitorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
