/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudRolEncargadoEventoComponent } from './crud-rol_encargado_evento.component';

describe('CrudRolEncargadoEventoComponent', () => {
  let component: CrudRolEncargadoEventoComponent;
  let fixture: ComponentFixture<CrudRolEncargadoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRolEncargadoEventoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRolEncargadoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
