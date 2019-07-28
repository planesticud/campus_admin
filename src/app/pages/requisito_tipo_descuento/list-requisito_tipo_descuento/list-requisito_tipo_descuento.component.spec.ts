/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListRequisitoTipoDescuentoComponent } from './list-requisito_tipo_descuento.component';

describe('ListRequisitoTipoDescuentoComponent', () => {
  let component: ListRequisitoTipoDescuentoComponent;
  let fixture: ComponentFixture<ListRequisitoTipoDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequisitoTipoDescuentoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequisitoTipoDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
