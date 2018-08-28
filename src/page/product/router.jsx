import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import ProductDetail from 'page/product//index/detail.jsx';
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

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
            <Route path="/product/save/:pid?" component={ProductSave} />
            <Route path="/product/detail/:pid" component={ProductDetail} />
            <Route path="/product-category/index/:categoryId?" component={CategoryList} />
            <Route path="/product-category/add" component={CategoryAdd} />
            <Redirect exact from="/product" to="/product/index" />
            <Redirect exact from="/product-category" to="/product-category/index" />
          </Switch>
        </Router>
      </div>);
  }
}

export default ProductRouter;