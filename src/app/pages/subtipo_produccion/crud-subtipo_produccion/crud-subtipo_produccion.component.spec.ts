/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudSubtipoProduccionComponent } from './crud-subtipo_produccion.component';

describe('CrudSubtipoProduccionComponent', () => {
  let component: CrudSubtipoProduccionComponent;
  let fixture: ComponentFixture<CrudSubtipoProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudSubtipoProduccionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudSubtipoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
