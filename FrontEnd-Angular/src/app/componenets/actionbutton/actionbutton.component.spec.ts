/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ActionbuttonComponent } from './actionbutton.component';

import { AuthenticationService } from './../../_services/authentication.service';
import { MaterialModule } from '../../_modules/material.module';

describe('ActionbuttonComponent', () => {
  let component: ActionbuttonComponent;
  let fixture: ComponentFixture<ActionbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, HttpClientModule],
      providers: [AuthenticationService],
      declarations: [ActionbuttonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
