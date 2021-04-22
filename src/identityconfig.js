const config = {
    clientId: "m2m.client",
    clientSecret: "SuperSecretPassword",
    scope: "weatherapi.read",
    grantType:"client_credentials"
};

export default function identityInfo() {
      return config;   
  }