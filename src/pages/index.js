import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Route, useHistory, Switch, Redirect } from "react-router-dom";
import isAuthenticated from '../utils/isAuthenticated';
import Login from './login';
import routes from '../routes';

const RenderRoute = (route) => {
  const history = useHistory();
  if(route.route.needsAuth && !isAuthenticated()){
    // history.push('/auth');
    return (
      <Route 
      path={route.path} 
      render={(props) => <Login {...props} />} 
      />
      // <Redirect from="/" to="/auth" />
    );
  } else {
    return (
      <Route 
      path={route.path} 
      render={(props) => <Login {...props} />} 
      />
      );
  }


};

ReactDOM.render(
  //  <React.StrictMode>
  //    <App />
  //  </React.StrictMode>
  <Router>
    <Switch>
      {routes.map((route, index) => (<RenderRoute route={route} key={index} />))}
      <Redirect from="*" to="/login" />
    </Switch>
  </Router>
  
  ,
  document.getElementById('root')
);




// export default function() {
//   return (


//     <BrowserRouter>
//     <Switch>
//       {routes.map((route, index) => (<RenderRoute route={route} key={index} />))}
//     </Switch>
//   </BrowserRouter>

//   );
// }
