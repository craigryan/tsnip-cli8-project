import { TestBed, inject } from '@angular/core/testing';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import {MyActions} from './my.actions';
import {IMyState} from './my.store';
import { getTotal } from './my.selectors';

import { MyapiService } from './myapi.service';

describe('MyapiService', () => {
  const apiUrl: string = 'http://localhost:8080/myapi';
  let service: MyapiService;
  let httpMock: HttpTestingController;
  let mockStore: MockStore<IMyState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        MyapiService,
        provideMockStore({})
      ]
    });
    service = TestBed.get(MyapiService);
    httpMock = TestBed.get(HttpTestingController);

    mockStore = TestBed.get(Store);
    spyOn(mockStore, 'dispatch')
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('and getApiResponse', () => {
    it('should return valid response string', () => {
      const apiResponse = { stringValue: 'a value' };

      service.getApiResponse().subscribe((stringValue) => {
        expect(stringValue).toBeTruthy();
        expect(stringValue).toEqual('a value');
      });

      // const getReq = httpMock.expectOne(apiUrl); or more specifically:
      const getReq = httpMock.expectOne(req => req.method === 'GET' && req.url === apiUrl);
      getReq.flush(apiResponse);

      expect(getReq.request.headers.keys().length).toEqual(1);
      expect(getReq.request.headers.keys()).toEqual(['x-stuff']);
      expect(getReq.request.headers.get('x-stuff')).toBe('api');
    });
  });
  describe('and storeResult', () => {
  });
});
