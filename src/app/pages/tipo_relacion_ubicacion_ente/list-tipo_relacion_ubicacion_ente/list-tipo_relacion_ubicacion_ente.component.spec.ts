/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListTipoRelacionUbicacionEnteComponent } from './list-tipo_relacion_ubicacion_ente.component';

describe('ListTipoRelacionUbicacionEnteComponent', () => {
  let component: ListTipoRelacionUbicacionEnteComponent;
  let fixture: ComponentFixture<ListTipoRelacionUbicacionEnteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoRelacionUbicacionEnteComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoRelacionUbicacionEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
