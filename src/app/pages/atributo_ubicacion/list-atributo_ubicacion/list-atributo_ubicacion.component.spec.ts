/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListAtributoUbicacionComponent } from './list-atributo_ubicacion.component';

describe('ListAtributoUbicacionComponent', () => {
  let component: ListAtributoUbicacionComponent;
  let fixture: ComponentFixture<ListAtributoUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAtributoUbicacionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAtributoUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
