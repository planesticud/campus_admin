/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudRequisitoTipoDescuentoComponent } from './crud-requisito_tipo_descuento.component';

describe('CrudRequisitoTipoDescuentoComponent', () => {
  let component: CrudRequisitoTipoDescuentoComponent;
  let fixture: ComponentFixture<CrudRequisitoTipoDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRequisitoTipoDescuentoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRequisitoTipoDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
