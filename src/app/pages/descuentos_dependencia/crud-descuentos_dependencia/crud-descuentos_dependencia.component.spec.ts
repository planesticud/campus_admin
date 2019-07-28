/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudDescuentosDependenciaComponent } from './crud-descuentos_dependencia.component';

describe('CrudDescuentosDependenciaComponent', () => {
  let component: CrudDescuentosDependenciaComponent;
  let fixture: ComponentFixture<CrudDescuentosDependenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudDescuentosDependenciaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDescuentosDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
