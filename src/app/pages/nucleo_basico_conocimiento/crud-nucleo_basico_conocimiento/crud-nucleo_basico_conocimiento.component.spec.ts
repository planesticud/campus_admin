/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudNucleoBasicoConocimientoComponent } from './crud-nucleo_basico_conocimiento.component';

describe('CrudNucleoBasicoConocimientoComponent', () => {
  let component: CrudNucleoBasicoConocimientoComponent;
  let fixture: ComponentFixture<CrudNucleoBasicoConocimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudNucleoBasicoConocimientoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudNucleoBasicoConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
