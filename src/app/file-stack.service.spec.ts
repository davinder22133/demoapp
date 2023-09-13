import { TestBed } from '@angular/core/testing';

import { FileStackService } from './file-stack.service';

describe('FileStackService', () => {
  let service: FileStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
