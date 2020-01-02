/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListDependenciaPadreComponent } from './list-dependencia_padre.component';

describe('ListDependenciaPadreComponent', () => {
  let component: ListDependenciaPadreComponent;
  let fixture: ComponentFixture<ListDependenciaPadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDependenciaPadreComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDependenciaPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
