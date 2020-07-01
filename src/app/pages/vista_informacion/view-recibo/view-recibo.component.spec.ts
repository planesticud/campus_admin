/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ViewReciboComponent } from './view-recibo.component';

describe('ViewIdiomasComponent', () => {
  let component: ViewReciboComponent;
  let fixture: ComponentFixture<ViewReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReciboComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
