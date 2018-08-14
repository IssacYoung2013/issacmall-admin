import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  let layoutRouter = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/product" component={Home} />
      <Route path="/product.category" component={Home} />
      <Route path="/user/index" component={UserList} />
      <Route exact from="/user" to="/user/index" />
      <Route component={ErrorPage} />
    </Switch>
  </Layout>
);

render() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => layoutRouter} />

        </Switch>
      </Router>
    </div>);
}
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);