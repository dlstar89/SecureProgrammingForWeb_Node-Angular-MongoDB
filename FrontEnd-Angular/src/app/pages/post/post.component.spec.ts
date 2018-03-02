/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostComponent } from './post.component';
import { MessagecardComponent } from '../../componenets/messagecard/messagecard.component';

import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../_modules/material.module';
import { HttpClientModule } from '@angular/common/http';

import { PostService } from '../../_services/post.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { MessageService } from '../../_services/message.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, HttpClientModule],
      providers: [PostService, AuthenticationService, MessageService],
      declarations: [PostComponent, MessagecardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
