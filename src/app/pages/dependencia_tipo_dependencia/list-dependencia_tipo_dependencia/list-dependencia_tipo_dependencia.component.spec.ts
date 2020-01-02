/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListDependenciaTipoDependenciaComponent } from './list-dependencia_tipo_dependencia.component';

describe('ListDependenciaTipoDependenciaComponent', () => {
  let component: ListDependenciaTipoDependenciaComponent;
  let fixture: ComponentFixture<ListDependenciaTipoDependenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDependenciaTipoDependenciaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDependenciaTipoDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
