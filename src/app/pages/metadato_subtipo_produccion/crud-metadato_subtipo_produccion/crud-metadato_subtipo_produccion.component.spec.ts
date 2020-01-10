/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudMetadatoSubtipoProduccionComponent } from './crud-metadato_subtipo_produccion.component';

describe('CrudMetadatoSubtipoProduccionComponent', () => {
  let component: CrudMetadatoSubtipoProduccionComponent;
  let fixture: ComponentFixture<CrudMetadatoSubtipoProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMetadatoSubtipoProduccionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMetadatoSubtipoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
