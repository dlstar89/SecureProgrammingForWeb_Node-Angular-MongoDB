/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalNewPostComponent } from './modalNewPost.component';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../_modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormValidationsService } from '../../_utils/formValidations.service';
import { AuthenticationService, TokenPayload } from './../../_services/authentication.service';
import { PostService } from './../../_services/post.service';

describe('ModalNewPostComponent', () => {
  let component: ModalNewPostComponent;
  let fixture: ComponentFixture<ModalNewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
      providers: [AuthenticationService, FormValidationsService, PostService, { provide: MatDialogRef, useValue: {} }],
      declarations: [ModalNewPostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
