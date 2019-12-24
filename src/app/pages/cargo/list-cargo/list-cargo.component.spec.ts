/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ListCargoComponent } from './list-cargo.component';

describe('ListCargoComponent', () => {
  let component: ListCargoComponent;
  let fixture: ComponentFixture<ListCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCargoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
