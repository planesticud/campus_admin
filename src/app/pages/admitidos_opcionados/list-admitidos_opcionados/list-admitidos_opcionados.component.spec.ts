/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListAdmitidosOpcionadosComponent } from './list-admitidos_opcionados.component';


describe('ListAdmitidosOpcionadosComponent', () => {
  let component: ListAdmitidosOpcionadosComponent;
  let fixture: ComponentFixture<ListAdmitidosOpcionadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdmitidosOpcionadosComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdmitidosOpcionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
