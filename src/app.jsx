import React from 'react';
import ReactDOM from 'react-dom';


class Component extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      name: 'Issac'
    }
  }

  // 组件将要加载
  componentWillMount() {
    console.log('componentWillMount');
  }

  // 组件加载完成
  componentDidMount() {
    console.log('componentDidMount');

  }

  // 将要接收父组件传来的props
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  // 子组件是否应该更新
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  //组件将要更新
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  // 组件更新完成
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  // 点击
  handleClick() {
    console.log('handleClick');
    this.setState({
      name: 'Yang'
    });
  }

  render() {
    console.log('render');
    return (<div>
      <div>{this.props.name}</div>
      <button onClick={() => { this.handleClick() }}>更新组件</button>
    </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      name: 'Issac Parent',
      hasChild: true
    };
  }

  onPropsChange(){
    console.log('onPropsChange');
    this.setState({
      name:'New Issac '
    })
  }

  onDestroyChild() {
    console.log('onDestroyChild');
    this.setState({
      hasChild:false
    })
  }

  render() {
    return <div>
      {
        this.state.hasChild ?  <Component name={this.state.name} />: null
      }
      <button onClick={()=>{this.onPropsChange();}}>改变Props</button>
      <button onClick={()=>{this.onDestroyChild();}}>干掉子组件</button>
    </div>
  };
}
ReactDOM.render(
  <App />,
  document.getElementById("app")
);