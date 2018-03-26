/* tslint:disable:no-unused-variable */
import { RouteAuthenticationGuardService } from './routeAuthentication-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

describe('Service: RouteAuthenticationGuard', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [RouteAuthenticationGuardService, AuthenticationService]
    })
      .compileComponents();
  }));

  it('should inject RouteAuthenticationGuardService',
    inject([RouteAuthenticationGuardService], (service: RouteAuthenticationGuardService) => {
      expect(service).toBeTruthy();
    }));
});
