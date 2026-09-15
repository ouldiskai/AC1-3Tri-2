import { TestBed } from '@angular/core/testing';
import { Contatos } from './contatos';

describe('Contatos', () => {
  let service: Contatos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contatos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
