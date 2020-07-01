/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudRequisitoProgramaAcademicoComponent } from './crud-requisito_programa_academico.component';

describe('CrudRequisitoProgramaAcademicoComponent', () => {
  let component: CrudRequisitoProgramaAcademicoComponent;
  let fixture: ComponentFixture<CrudRequisitoProgramaAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRequisitoProgramaAcademicoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRequisitoProgramaAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
