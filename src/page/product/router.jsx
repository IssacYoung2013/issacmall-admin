import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';


class ProductRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   

    return (
      <div>
        <Router>
          <Switch>
            <Route path="/product/index" component={ProductList} />
            <Route path="/product/save" component={ProductSave} />

            <Redirect exact from="/product" to="/product/index" />
          </Switch>
        </Router>
      </div>);
  }
}

export default ProductRouter;