/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListMetadatoSubtipoProduccionComponent } from './list-metadato_subtipo_produccion.component';

describe('ListSubtipoProduccionComponent', () => {
  let component: ListMetadatoSubtipoProduccionComponent;
  let fixture: ComponentFixture<ListMetadatoSubtipoProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMetadatoSubtipoProduccionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMetadatoSubtipoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
