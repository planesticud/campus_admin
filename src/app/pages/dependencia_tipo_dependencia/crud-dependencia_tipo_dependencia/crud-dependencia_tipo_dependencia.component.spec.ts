/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudDependenciaTipoDependenciaComponent } from './crud-dependencia_tipo_dependencia.component';

describe('CrudDependenciaTipoDependenciaComponent', () => {
  let component: CrudDependenciaTipoDependenciaComponent;
  let fixture: ComponentFixture<CrudDependenciaTipoDependenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDependenciaTipoDependenciaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDependenciaTipoDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
