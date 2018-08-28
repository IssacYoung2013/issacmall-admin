import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        };
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    loadCategoryList() {
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        let categoryName = this.state.categoryName.trim();
        // 如果商品品类名称不为空
        if (categoryName) {
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName
            }).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }

    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId"
                                        className="form-control"
                                        onChange={(e) => this.onValueChange(e)}
                                    >
                                        <option value="0">根品类</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option key={index} value={category.id}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        name="categoryName"
                                        value={this.state.categoryName}
                                        className="form-control"
                                        placeholder="请输入品类名称"
                                        onChange={(e) => this.onValueChange(e)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button className="btn btn-primary"
                                        onClick={(e) => this.onSubmit(e)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;