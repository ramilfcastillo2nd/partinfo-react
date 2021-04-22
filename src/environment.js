const environment = {
    baseApiUrl: "http://identity-authserver-api.azurewebsites.net",
    authApiUrl: "http://identity-authserver-api.azurewebsites.net"
};

const localEnvironment = {
    baseApiUrl: "http://identity-authserver-api.azurewebsites.net",
    authApiUrl: "http://identity-authserver-api.azurewebsites.net"
};

if(process.env.REACT_APP_ENV === "development"){
    environment.baseUrl = "http://dev.project.com";
}

if(process.env.REACT_APP_ENV === "staging"){
    environment.baseUrl = "http://sta.project.com";
}

if(process.env.REACT_APP_ENV === "production"){
    environment.baseUrl = "http://prod.project.com";
}


export default function environmentConfig() {
    if (process.env.NODE_ENV === 'development') {
      return environment;
    }
  
    return localEnvironment;
  }