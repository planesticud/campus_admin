/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CrudTipoDocumentoProgramaComponent } from './crud-tipo_documento_programa.component';

describe('CrudTipoDocumentoProgramaComponent', () => {
  let component: CrudTipoDocumentoProgramaComponent;
  let fixture: ComponentFixture<CrudTipoDocumentoProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTipoDocumentoProgramaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTipoDocumentoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
