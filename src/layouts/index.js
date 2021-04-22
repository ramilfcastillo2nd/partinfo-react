import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Route, useHistory, Switch, Redirect } from "react-router-dom";
import styles from './index.css';
import routes from '../routes';
import Login from '../pages/login';
import isAuthenticated from '../utils/isAuthenticated';
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
function BasicLayout(props) {


  
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}> Part Info Login</h1>
      {props.children}
      <Router>
        <Switch>
          {routes.map((route, index) => (<RenderRoute route={route} key={index} />))}
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>

    </div>
  );
}

export default BasicLayout;
