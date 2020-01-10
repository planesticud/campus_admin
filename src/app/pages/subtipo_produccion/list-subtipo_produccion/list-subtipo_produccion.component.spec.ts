/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListSubtipoProduccionComponent } from './list-subtipo_produccion.component';

describe('ListSubtipoProduccionComponent', () => {
  let component: ListSubtipoProduccionComponent;
  let fixture: ComponentFixture<ListSubtipoProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubtipoProduccionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubtipoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
