/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListTipoDependenciaDescuentoComponent } from './list-tipo_dependencia_descuento.component';

describe('ListTipoDependenciaDescuentoComponent', () => {
  let component: ListTipoDependenciaDescuentoComponent;
  let fixture: ComponentFixture<ListTipoDependenciaDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoDependenciaDescuentoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoDependenciaDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
