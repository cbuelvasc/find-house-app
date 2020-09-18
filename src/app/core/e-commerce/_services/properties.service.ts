import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { PropertyModel } from '../_models/property.model';
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

const API_PROPERTIES_URL = 'http://localhost:3000/api/property';

@Injectable()
export class PropertiesService {

  url = '../../../../assets/data/';

  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {
  }

  public getFeaturedProperties(): Observable<PropertyModel[]> {
    return this.http.get<PropertyModel[]>(`${this.url}featured-properties.json`);
  }

  public getProperties(): Observable<PropertyModel[]> {
    return this.http.get<PropertyModel[]>(API_PROPERTIES_URL);
  }

  public getPropertyByIdTwo(id: number): Observable<PropertyModel> {
    return this.http.get<PropertyModel>(`${this.url}property-${id}.json`);
  }

  public getPropertyTypes(): Array<any> {
    return [
      { id: 1, name: 'Office' },
      { id: 2, name: 'House' },
      { id: 3, name: 'Apartment' }
    ];
  }

  createProperty(property: PropertyModel): Observable<PropertyModel> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<PropertyModel>(API_PROPERTIES_URL, property, { headers: httpHeaders });
  }

  getAllProperties(): Observable<PropertyModel[]> {
    return this.http.get<PropertyModel[]>(API_PROPERTIES_URL);
  }

  getPropertyById(propertyId: string): Observable<PropertyModel> {
    return this.http.get<PropertyModel>(API_PROPERTIES_URL + `/${propertyId}`);
  }

  findProperties(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    console.log('findProperties');
    return this.http.post<QueryResultsModel>(API_PROPERTIES_URL + '/findProperties', queryParams, { headers: this.httpHeaders() });
  }

  updateProperty(property: PropertyModel): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.put(API_PROPERTIES_URL, property, { headers: httpHeaders });
  }

  updateStatusForProperty(property: PropertyModel[], status: string): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = {
      productsForUpdate: property,
      newStatus: status
    };
    const url = API_PROPERTIES_URL + '/updateStatus';
    return this.http.put(url, body, { headers: httpHeaders });
  }

  deleteProperty(propertyId: string): Observable<PropertyModel> {
    const url = `${API_PROPERTIES_URL}/${propertyId}`;
    return this.http.delete<PropertyModel>(url);
  }

  deleteProperties(ids: string[] = []): Observable<any> {
    const url = API_PROPERTIES_URL + '/delete';
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    const body = { prdocutIdsForDelete: ids };
    return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders });
  }

  private httpHeaders(): HttpHeaders {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('Authorization', `Bearer ${userToken}`);
    return httpHeaders;
  }

}
