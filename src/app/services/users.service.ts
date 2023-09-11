import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  addUser(user: IUser): Observable<string> {
    return of('User successfully created!').pipe(delay(2000));
  }
  checkEmail(email: string): Observable<string> {
    let response: string = '';
    if (email === 'test@test.test') {
      response = 'User with this email elready exists!';
    }
    return of(response).pipe(delay(2000));
  }
}
