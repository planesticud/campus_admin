/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudAsignarEntrevistaComponent } from './crud-asignar_entrevista.component';

describe('CrudAsignarEntrevistaComponent', () => {
  let component: CrudAsignarEntrevistaComponent;
  let fixture: ComponentFixture<CrudAsignarEntrevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAsignarEntrevistaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAsignarEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
