/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListEstadoEntrevistaComponent } from './list-estado_entrevista.component';

describe('ListEstadoEntrevistaComponent', () => {
  let component: ListEstadoEntrevistaComponent;
  let fixture: ComponentFixture<ListEstadoEntrevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEstadoEntrevistaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstadoEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
