/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';


import { ActionbuttonComponent } from './actionbutton.component';

describe('ActionbuttonComponent', () => {
  let component: ActionbuttonComponent;
  let fixture: ComponentFixture<ActionbuttonComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [RouterTestingModule, MatDialogModule],
  //     declarations: [ActionbuttonComponent]
  //   })
  //     .compileComponents();
  // }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [ActionbuttonComponent]
    });
    fixture = TestBed.createComponent(ActionbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
