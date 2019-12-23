/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListPerfilProfesionalComponent } from './list-perfil_profesional.component';

describe('ListPerfilProfesionalComponent', () => {
  let component: ListPerfilProfesionalComponent;
  let fixture: ComponentFixture<ListPerfilProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPerfilProfesionalComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerfilProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
