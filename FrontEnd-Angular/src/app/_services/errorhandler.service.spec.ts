/* tslint:disable:no-unused-variable */
// tslint:disable-next-line:max-line-length
import { Overlay, ScrollStrategyOptions, ScrollDispatcher, ViewportRuler, OverlayContainer, OverlayPositionBuilder, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { MaterialModule } from './../_modules/material.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorhandlerService } from './errorhandler.service';
import { MatSnackBar } from '@angular/material';
import { Platform } from '@angular/cdk/platform';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';

describe('Service: Errorhandler', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ErrorhandlerService, MatSnackBar,
        Overlay, ScrollStrategyOptions, ScrollDispatcher, Platform, ViewportRuler, OverlayContainer,
        OverlayPositionBuilder, OverlayKeyboardDispatcher, LiveAnnouncer, BreakpointObserver, MediaMatcher]
    })
      .compileComponents();
  }));

  it('should inject ErrorhandlerService', inject([ErrorhandlerService], (service: ErrorhandlerService) => {
    expect(service).toBeTruthy();
  }));
});
