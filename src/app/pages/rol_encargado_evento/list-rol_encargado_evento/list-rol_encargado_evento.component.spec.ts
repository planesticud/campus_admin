/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListRolEncargadoEventoComponent } from './list-rol_encargado_evento.component';

describe('ListRolEncargadoEventoComponent', () => {
  let component: ListRolEncargadoEventoComponent;
  let fixture: ComponentFixture<ListRolEncargadoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRolEncargadoEventoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRolEncargadoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
