/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudRelacionLugarComponent } from './crud-relacion_lugar.component';

describe('CrudRelacionLugarComponent', () => {
  let component: CrudRelacionLugarComponent;
  let fixture: ComponentFixture<CrudRelacionLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudRelacionLugarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudRelacionLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
