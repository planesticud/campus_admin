/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListAsignarEntrevistaComponent } from './list-asignar_entrevista.component';

describe('ListEntrevistaComponent', () => {
  let component: ListAsignarEntrevistaComponent;
  let fixture: ComponentFixture<ListAsignarEntrevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAsignarEntrevistaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAsignarEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
