import { PostService } from './post.service';
/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Post', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PostService]
    })
      .compileComponents();
  }));

  it('should inject PostService', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});
