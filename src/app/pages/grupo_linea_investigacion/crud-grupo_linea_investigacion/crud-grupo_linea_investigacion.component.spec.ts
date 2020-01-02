/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudGrupoLineaInvestigacionComponent } from './crud-grupo_linea_investigacion.component';

describe('CrudGrupoLineaInvestigacionComponent', () => {
  let component: CrudGrupoLineaInvestigacionComponent;
  let fixture: ComponentFixture<CrudGrupoLineaInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudGrupoLineaInvestigacionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudGrupoLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
