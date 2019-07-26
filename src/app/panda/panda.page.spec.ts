import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PandaPage } from './panda.page';

describe('PandaPage', () => {
  let component: PandaPage;
  let fixture: ComponentFixture<PandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PandaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
