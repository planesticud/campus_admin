/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudConfiguracionFechasComponent } from './crud-configuracion_fechas.component';

describe('CrudConfiguracionFechasComponent', () => {
  let component: CrudConfiguracionFechasComponent;
  let fixture: ComponentFixture<CrudConfiguracionFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudConfiguracionFechasComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudConfiguracionFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
