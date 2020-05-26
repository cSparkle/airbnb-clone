import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId = "abc";

  // this pattern again is to prevent accidentally overriding the _userIsAuthenticated variable
  // this forces us to use only login() or logout() to change the value of this variable
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }
  constructor() {}

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
