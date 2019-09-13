/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudEntrevistadorComponent } from './crud-entrevistador.component';

describe('CrudEntrevistadorComponent', () => {
  let component: CrudEntrevistadorComponent;
  let fixture: ComponentFixture<CrudEntrevistadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEntrevistadorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEntrevistadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
