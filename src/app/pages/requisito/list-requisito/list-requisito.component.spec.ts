/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListRequisitoComponent } from './list-requisito.component';

describe('ListRequisitoComponent', () => {
  let component: ListRequisitoComponent;
  let fixture: ComponentFixture<ListRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequisitoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
