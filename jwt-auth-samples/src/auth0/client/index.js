const auth0Lock = require('auth0-lock')

const lock =
  new auth0Lock.Auth0Lock(
    process.env.AUTH0_CLIENTID || "",
    process.env.AUTH0_DOMAIN || "",
    {
      container: 'show-auth',
      closable: false,
      auth: {
        responseType: "token id_token",
        redirectUrl: 'http://localhost:5000' + "/callback",
        params: {
          scope: "openid profile email"
        }
      }
    }
  )

lock.show()