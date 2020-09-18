import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

const API_USERS_URL = 'http://localhost:3000/api/users';
const API_PERMISSION_URL = 'http://localhost:3000/api/permissions';
const API_ROLES_URL = 'http://localhost:3000/api/roles';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/auth/login', { email, password });
  }

  getUserByToken(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/api/users/findUsersByToken', { headers: this.httpHeaders() });
  }

  register(user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>('http://localhost:3000/api/auth/register', user, { headers: httpHeaders })
      .pipe(
        map((res: User) => {
          return res;
        }),
        catchError(err => {
          return null;
        })
      );
  }

  public requestPassword(email: string): Observable<any> {
    return this.http.get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_USERS_URL);
  }

  getUserById(userId: string): Observable<User> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    return this.http.get<User>(API_USERS_URL + `/${userId}`, { headers: this.httpHeaders() });
  }

  deleteUser(userId: string) {
    const url = `${API_USERS_URL}/${userId}`;
    return this.http.delete(url);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_USERS_URL, user, { headers: this.httpHeaders() });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(API_USERS_URL, user, { headers: this.httpHeaders() });
  }

  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, { headers: this.httpHeaders() });
  }

  // Permission
  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL);
  }

  getRolePermissions(roleId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
  }

  // Roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(API_ROLES_URL);
  }

  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
  }

  // CREATE =>  POST: add a new role to the server
  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(API_ROLES_URL, role, { headers: this.httpHeaders() });
  }

  // UPDATE => PUT: update the role on the server
  updateRole(role: Role): Observable<any> {
    return this.http.put(API_ROLES_URL, role, { headers: this.httpHeaders() });
  }

  // DELETE => delete the role from the server
  deleteRole(roleId: string): Observable<Role> {
    const url = `${API_ROLES_URL}/${roleId}`;
    return this.http.delete<Role>(url);
  }

  // Check Role Before deletion
  isRoleAssignedToUsers(roleId: string): Observable<boolean> {
    return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
  }

  findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
  }


  private httpHeaders(): HttpHeaders {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('Authorization', `Bearer ${userToken}`);
    return httpHeaders;
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
    *
  * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
