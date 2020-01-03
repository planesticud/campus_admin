/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListValorAtributoLugarComponent } from './list-valor_atributo_lugar.component';

describe('ListValorAtributoLugarComponent', () => {
  let component: ListValorAtributoLugarComponent;
  let fixture: ComponentFixture<ListValorAtributoLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListValorAtributoLugarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListValorAtributoLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
