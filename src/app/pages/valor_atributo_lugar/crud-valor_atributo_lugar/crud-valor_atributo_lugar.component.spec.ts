/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudValorAtributoLugarComponent } from './crud-valor_atributo_lugar.component';

describe('CrudValorAtributoLugarComponent', () => {
  let component: CrudValorAtributoLugarComponent;
  let fixture: ComponentFixture<CrudValorAtributoLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudValorAtributoLugarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudValorAtributoLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
