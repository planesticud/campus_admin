/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudPerfilProfesionalComponent } from './crud-perfil_profesional.component';

describe('CrudPerfilProfesionalComponent', () => {
  let component: CrudPerfilProfesionalComponent;
  let fixture: ComponentFixture<CrudPerfilProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPerfilProfesionalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPerfilProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
