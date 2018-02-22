/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessagecardComponent } from './messagecard.component';

describe('MessagecardComponent', () => {
  let component: MessagecardComponent;
  let fixture: ComponentFixture<MessagecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
