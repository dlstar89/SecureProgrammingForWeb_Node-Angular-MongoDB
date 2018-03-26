/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { MessageService } from './message.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Message', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageService]
    })
      .compileComponents();
  }));

  it('should inject MessageService', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
