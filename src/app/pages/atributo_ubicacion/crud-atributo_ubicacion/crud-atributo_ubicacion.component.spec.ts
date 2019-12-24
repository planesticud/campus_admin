/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudAtributoUbicacionComponent } from './crud-atributo_ubicacion.component';

describe('CrudAtributoUbicacionComponent', () => {
  let component: CrudAtributoUbicacionComponent;
  let fixture: ComponentFixture<CrudAtributoUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAtributoUbicacionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAtributoUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
