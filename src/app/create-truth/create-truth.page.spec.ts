import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTruthPage } from './create-truth.page';

describe('CreateTruthPage', () => {
  let component: CreateTruthPage;
  let fixture: ComponentFixture<CreateTruthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTruthPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTruthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
