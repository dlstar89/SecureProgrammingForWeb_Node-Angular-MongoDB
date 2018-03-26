/* tslint:disable:no-unused-variable */
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './authentication.service';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Authentication', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AuthenticationService]
    })
      .compileComponents();
  }));

  it('should inject AuthenticationService', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
