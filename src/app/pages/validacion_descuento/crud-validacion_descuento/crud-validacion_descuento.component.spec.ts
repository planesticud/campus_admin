/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudValidacionDescuentoComponent } from './crud-validacion_descuento.component';

describe('CrudValidacionDescuentoComponent', () => {
  let component: CrudValidacionDescuentoComponent;
  let fixture: ComponentFixture<CrudValidacionDescuentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudValidacionDescuentoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudValidacionDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
