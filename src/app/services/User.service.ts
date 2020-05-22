import { User } from '../models/User.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {url} from '../../.env/myconfig';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private httpclient: HttpClient) {
    this.getUserFromServer();
  }


  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users);
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveUserToServer();
    this.emitUsers();
  }
  saveUserToServer() {
    this.httpclient
      .put(`${url}/users.json`, this.users)
      .subscribe(
        () => {
          console.log( 'user enregistré !');
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getUserFromServer() {
    this.httpclient
      .get<User[]>(`${url}/users.json`)
      .subscribe(
        (response) => {
          this.users = response || [];
          this.users = this.users.filter(user => user !== null);
          this.emitUsers();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
