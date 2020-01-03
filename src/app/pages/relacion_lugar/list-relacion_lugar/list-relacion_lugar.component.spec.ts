/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListRelacionLugarComponent } from './list-relacion_lugar.component';

describe('ListRelacionLugarComponent', () => {
  let component: ListRelacionLugarComponent;
  let fixture: ComponentFixture<ListRelacionLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRelacionLugarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRelacionLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
