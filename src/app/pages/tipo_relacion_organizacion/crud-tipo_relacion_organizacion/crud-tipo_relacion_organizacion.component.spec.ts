/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudTipoRelacionOrganizacionComponent } from './crud-tipo_relacion_organizacion.component';

describe('CrudTipoRelacionOrganizacionComponent', () => {
  let component: CrudTipoRelacionOrganizacionComponent;
  let fixture: ComponentFixture<CrudTipoRelacionOrganizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTipoRelacionOrganizacionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTipoRelacionOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
