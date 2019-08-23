/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudEvaluacionInscripcionComponent } from './crud-evaluacion_inscripcion.component';

describe('CrudEvaluacionInscripcionComponent', () => {
  let component: CrudEvaluacionInscripcionComponent;
  let fixture: ComponentFixture<CrudEvaluacionInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEvaluacionInscripcionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEvaluacionInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
