/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListRequisitoProgramaAcademicoComponent } from './list-requisito_programa_academico.component';

describe('ListRequisitoProgramaAcademicoComponent', () => {
  let component: ListRequisitoProgramaAcademicoComponent;
  let fixture: ComponentFixture<ListRequisitoProgramaAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequisitoProgramaAcademicoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequisitoProgramaAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
