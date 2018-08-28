import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';
import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 // 商品状态1 待售
        }
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {

        // 有id表示编辑功能，需要表单回填
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                // 加载表单详情
                if (res.subImages.length !== 0) {
                    let images = res.subImages.split(',');
                    res.subImages = images.map((imgUri) => {
                        return {
                            uri: imgUri,
                            url: res.imageHost + imgUri
                        }
                    });
                } else {
                    res.subImages = [];
                }
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        }
    }

    render() {
        return (
            <div>
                <div id="page-wrapper">
                    <PageTitle title="商品详情" />
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品名称</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.name}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品描述</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.subtitle}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">所属分类</label>
                            <CategorySelector
                                readOnly
                                categoryId={this.state.categoryId}
                                parentCategoryId={this.state.parentCategoryId}></CategorySelector>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品价格</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number"
                                        name="price"
                                        value={this.state.price}
                                        className="form-control"
                                        placeholder="价格" readOnly />
                                    <span className="input-group-addon">元</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-2 control-label">商品库存</label>
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input type="number"
                                        name="stock"
                                        value={this.state.stock}
                                        className="form-control"
                                        placeholder="库存"
                                        readOnly />
                                    <span className="input-group-addon">件</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-2 control-label">商品图片</label>
                            <div className="col-md-10">
                                {this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                    return (
                                        <div className="img-con" key={index}>
                                            <img className="img" src={image.url} />
                                            <i className="fa fa-close"
                                                index={index}
                                                onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>
                                    );
                                }) : (<div>暂无图片</div>)
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-2 control-label">商品详情</label>
                            <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>
                            </div>
                        </div>
                    </div>
                </div>

            </div>);
    }
}

export default ProductDetail;