import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list/index.jsx';

import './detail.scss';

const _mm = new MUtil();
const _order = new Order();

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderNo: this.props.match.params.orderNo,
            orderInfo: {}
        }
    }

    componentDidMount() {
        this.loadOrder();
    }

    loadOrder() {
        _order.getOrderDetail(this.state.orderNo).then((res) => {
            this.setState({
                orderInfo: res
            });
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }

    onSendGoods(){
        if(window.confirm('是否该订单已经发货？')) {
            _order.sendGoods(this.state.orderNo).then((res) => {
                _mm.successTips('发货成功');
                this.loadOrder();
            },(errMsg)=>{
            _mm.errorTips(errMsg);
            })
        }
    }

    render() {
        let receiverInfo = this.state.orderInfo.shippingVo || {},
            productList = this.state.orderInfo.orderItemVoList || [];
        let tableHeads =
            [
                { name: '商品图片', width: '30%' },
                { name: '商品信息', width: '30%' },
                { name: '单价', width: '10%' },
                { name: '数量', width: '15%' },
                { name: '合计', width: '15%' },
            ];
        return (
            <div>
                <div id="page-wrapper">
                    <PageTitle title="订单详情" />
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单号</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">创建时间</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">收件人</label>
                            <div className="col-md-5">
                                <p className="form-control-static">
                                    {receiverInfo.receiverName}
                                    {receiverInfo.receiverProvince}
                                    {receiverInfo.receiverCity}
                                    {receiverInfo.receiverAddress}
                                    {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                                </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">订单状态</label>
                            <div className="col-md-5">
                                <p className="form-control-static">
                                    {this.state.orderInfo.statusDesc}
                                    {
                                        this.state.orderInfo.status === 20
                                            ? <button className="btn btn-default btn-sm btn-send-goods"
                                            onClick={(e) => {this.onSendGoods(e)}}>立即发货</button> : null
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">支付方式</label>
                            <div className="col-md-5">
                                <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">支付金额</label>
                            <div className="col-md-5">
                                <p className="form-control-static">￥{this.state.orderInfo.payment}</p>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2 control-label">商品列表</label>
                            <div className="col-md-12">
                                <TableList tableHeads={tableHeads}>
                                    {
                                        productList.map((product, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    <img className="p-img"
                                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`}
                                                        alt={product.productName} />
                                                </td>
                                                <td>
                                                    {product.productName}
                                                </td>
                                                <td>
                                                    ￥ {product.currentUnitPrice}
                                                </td>
                                                <td>{product.quantity}</td>
                                                <td>￥{product.totalPrice}</td>
                                            </tr>);
                                        })
                                    }
                                </TableList>
                            </div>
                        </div>
                    </div>
                </div>

            </div >);
    }
}

export default ProductDetail;