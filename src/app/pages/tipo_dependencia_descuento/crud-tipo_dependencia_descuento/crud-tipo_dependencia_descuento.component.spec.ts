/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudTipoDependenciaDescuentoComponent } from './crud-tipo_dependencia_descuento.component';

describe('CrudTipoDependenciaDescuentoComponent', () => {
  let component: CrudTipoDependenciaDescuentoComponent;
  let fixture: ComponentFixture<CrudTipoDependenciaDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTipoDependenciaDescuentoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTipoDependenciaDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
