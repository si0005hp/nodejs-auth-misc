
import React from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import jwtDecode from 'jwt-decode'

class Auth0Util {
  constructor() {
    this.setToken = this.setToken.bind(this);
    this.getQueryParams = this.getQueryParams.bind(this);
    this.setTokenByQuery = this.setTokenByQuery.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.unsetToken = this.unsetToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.loginCallback = this.loginCallback.bind(this);
    this.logout = this.logout.bind(this);
  }

  setToken({ access_token, id_token, expires_in }) {
    const localStorage = window.localStorage
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('idToken', id_token)
    localStorage.setItem('expiresAt', expires_in * 1000 + new Date().getTime())
    localStorage.setItem('user', JSON.stringify(jwtDecode(id_token)))
  }

  getQueryParams() {
    return queryString.parse(window.location.hash)
  }

  setTokenByQuery() {
    this.setToken(this.getQueryParams());
  }

  isAuthenticated() {
    const expiresAt = window.localStorage.getItem('expiresAt')
    return new Date().getTime() < expiresAt
  }

  unsetToken() {
    const localStorage = window.localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('user')
  }

  getIdToken() {
    return this.isAuthenticated() ? localStorage.getItem('idToken') : null;
  }

  getUser() {
    return this.isAuthenticated() ? JSON.parse(localStorage.getItem('user')) : null;
  }

  loginCallback() {
    this.setTokenByQuery();
    return <Redirect to="/main" />
  }

  logout() {
    this.unsetToken();
    return <Redirect to="/login" />
  }

}

const auth0 = new Auth0Util();
export default auth0;