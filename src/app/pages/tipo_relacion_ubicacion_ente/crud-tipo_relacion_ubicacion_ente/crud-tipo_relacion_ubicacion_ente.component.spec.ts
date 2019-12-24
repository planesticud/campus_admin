/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudTipoRelacionUbicacionEnteComponent } from './crud-tipo_relacion_ubicacion_ente.component';

describe('CrudTipoRelacionUbicacionEnteComponent', () => {
  let component: CrudTipoRelacionUbicacionEnteComponent;
  let fixture: ComponentFixture<CrudTipoRelacionUbicacionEnteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTipoRelacionUbicacionEnteComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTipoRelacionUbicacionEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
