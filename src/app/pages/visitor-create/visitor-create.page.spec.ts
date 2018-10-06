import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCreatePage } from './visitor-create.page';

describe('VisitorCreatePage', () => {
  let component: VisitorCreatePage;
  let fixture: ComponentFixture<VisitorCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
