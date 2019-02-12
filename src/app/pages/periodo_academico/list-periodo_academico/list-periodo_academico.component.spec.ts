/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListPeriodoAcademicoComponent } from './list-periodo_academico.component';

describe('ListPeriodoAcademicoComponent', () => {
  let component: ListPeriodoAcademicoComponent;
  let fixture: ComponentFixture<ListPeriodoAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPeriodoAcademicoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPeriodoAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
