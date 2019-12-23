/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListTipoRelacionOrganizacionComponent } from './list-tipo_relacion_organizacion.component';

describe('ListTipoRelacionOrganizacionComponent', () => {
  let component: ListTipoRelacionOrganizacionComponent;
  let fixture: ComponentFixture<ListTipoRelacionOrganizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoRelacionOrganizacionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoRelacionOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
