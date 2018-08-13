import React from 'react';
import User from 'service/user-service.jsx';
import './index.scss';
import MUtil    from 'util/mm.jsx';
const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }

    onInputChange(e) {
        let inputvalue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputvalue
        });
    }

    // 用户提交表单
    onSubmit() {
        _user.login({
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(res);
            console.log(this.state.redirect);
            // this.props.history.push(thiss.state.redirect);
        }, (err) => {
            console.log(err);
            // _mm.errorTips(err);
        });
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - Issac MALL 管理系统</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="请输入用户名"
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="请输入密码"
                                    onChange={e => this.onInputChange(e)} />
                            </div>
                            <button 
                                className="btn btn-lg btn-primary btn-block"
                                onClick={e => this.onSubmit(e)}>登录</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;