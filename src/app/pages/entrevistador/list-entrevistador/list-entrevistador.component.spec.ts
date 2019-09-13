/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListEntrevistadorComponent } from './list-entrevistador.component';

describe('ListEntrevistadorComponent', () => {
  let component: ListEntrevistadorComponent;
  let fixture: ComponentFixture<ListEntrevistadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntrevistadorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntrevistadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
