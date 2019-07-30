/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudClasificacionIdiomaComponent } from './crud-clasificacion_idioma.component';

describe('CrudClasificacionIdiomaComponent', () => {
  let component: CrudClasificacionIdiomaComponent;
  let fixture: ComponentFixture<CrudClasificacionIdiomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudClasificacionIdiomaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudClasificacionIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
