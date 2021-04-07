import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppMessage } from '../data-models/app-message';
import { Group } from '../data-models/group';
import { User } from '../data-models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:8080';
  websocketUrl = 'ws://localhost:8080/messenger';

  jwt: string = null;
  userId: string = '';
  loggedUser: User;

  constructor(private httpClient: HttpClient) { }

  getGroups() {
    return this.httpClient.get(`${this.apiUrl}/groups`,
      {
        headers: {
          'Authorization': `Bearer ${this.getJwt()}`
        }
      })
  }

  getUserGroups(userId)
  {
    return this.httpClient.get<Group[]>(`${this.apiUrl}/users/${userId}/groups`,
      {
        headers: {
          'Authorization': `Bearer ${this.getJwt()}`
        }
      });
  }

  getLoggedUser(): Observable<User> {
    const user = JSON.parse(localStorage.getItem('user')) as User;


    return user? of(user) : this.httpClient.get<User>(`${this.apiUrl}/users/${this.userId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.getJwt()}`
        }
      })
  }

  getGroupMessages(groupId: string) {
    return this.httpClient.get<AppMessage[]>(`${this.apiUrl}/groups/${groupId}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${this.getJwt()}`
        }
      });
  }

  getGroupUsers(groupId: string) {
    return this.httpClient.get<User[]>(`${this.apiUrl}/groups/${groupId}/users`,
      {
        headers: {
          'Authorization': `Bearer ${this.getJwt()}`
        }
      });
  }

  signin(email: string, password: string) {
    const body = {
      email,
      password
    }

    const observable = this.httpClient.post(`${this.apiUrl}/api/auth/signin`, body);
    observable.subscribe(
      response => {
        const res = response as any;

        this.jwt = res.accessToken;
        this.userId = res.id;

        localStorage.setItem('jwt', this.jwt);

        this.getLoggedUser().subscribe(user => {
          let u = user as any;
          delete u.groups;
          delete u.roles;
          delete u._links;

          this.loggedUser = u;
          localStorage.setItem('user', JSON.stringify(this.loggedUser));
        })
      },
      () => console.error("Wrong credentials")
    );

    return observable;
  }

  signup(username: string, email: string, password: string) {
    const body = {
      username,
      email,
      password
    }

    return this.httpClient.post(`${this.apiUrl}/api/auth/signup`, body);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
  }

  getJwt() {
    if (!this.jwt) {
      this.jwt = localStorage.getItem('jwt');
    }

    return this.jwt;
  }
}
