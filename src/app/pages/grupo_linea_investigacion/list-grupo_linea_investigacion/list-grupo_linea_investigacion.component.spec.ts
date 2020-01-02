/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListGrupoLineaInvestigacionComponent } from './list-grupo_linea_investigacion.component';

describe('ListGrupoLineaInvestigacionComponent', () => {
  let component: ListGrupoLineaInvestigacionComponent;
  let fixture: ComponentFixture<ListGrupoLineaInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGrupoLineaInvestigacionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGrupoLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
