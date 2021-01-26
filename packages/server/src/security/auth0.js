const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const getConfig = () => {
  return {
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.Auth0_Issuer}.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.Auth0_Audience,
    issuer: process.env.Auth0_Issuer,
    algorithms: ['RS256']
  };
};
module.exports = () => jwt(getConfig());
