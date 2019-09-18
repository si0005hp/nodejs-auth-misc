
import jwt from 'jsonwebtoken'
import JwksRsa from 'jwks-rsa'
import dotenv from 'dotenv'

dotenv.config()
const jwksClient = new JwksRsa({ jwksUri: process.env.AUTH0_JWKS })

let signingKeyCache;
function getKey(header, callback) {
  if (signingKeyCache) return callback(null, signingKeyCache)

  jwksClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
    signingKeyCache = signingKey;
  });
}

export function authenticate(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Invalid token'
      });
    }
    req.jwtPayload = decoded;
    next();
  });
}