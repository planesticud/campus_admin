/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListNucleoBasicoConocimientoComponent } from './list-nucleo_basico_conocimiento.component';

describe('ListNucleoBasicoConocimientoComponent', () => {
  let component: ListNucleoBasicoConocimientoComponent;
  let fixture: ComponentFixture<ListNucleoBasicoConocimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNucleoBasicoConocimientoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNucleoBasicoConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
