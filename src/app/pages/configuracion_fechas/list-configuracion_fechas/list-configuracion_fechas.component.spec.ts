/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListConfiguracionFechasComponent } from './list-configuracion_fechas.component';

describe('ListConfiguracionFechasComponent', () => {
  let component: ListConfiguracionFechasComponent;
  let fixture: ComponentFixture<ListConfiguracionFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConfiguracionFechasComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConfiguracionFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
