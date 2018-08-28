import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import { Link } from 'react-router-dom';
import Pagination from 'util/pagination/index.jsx';
import ListSearch from 'page/order/index-list-search.jsx';
import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        };
    }

    componentDidMount() {
        this.loadOrderList();
    }

    loadOrderList() {
        let listParam = {};
        listParam.pageNum = this.state.pageNum;
        listParam.listType = this.state.listType;
        // 如果搜索 需要传入搜索类型和关键字
        if (this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNo;
        }

        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        });
    }

    // 页数发生变化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        });
    }

    onSearch(orderNo) {
        let listType = orderNo === '' ? 'list' : 'search';

        this.setState({
            listType: listType,
            pageNum: 1,
            orderNo: orderNo
        }, () => {
            this.loadOrderList();
        });
    }

    render() {

        let tableHeads = [
            { name: '订单号', width: '30%' },
            { name: '收件人', width: '15%' },
            { name: '订单状态', width: '10%' },
            { name: '订单总价', width: '15%' },
            { name: '创建时间', width: '15%' },
            { name: '操作', width: '15%' },
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表" />
                <ListSearch className="search-wrap" onSearch={(orderNo) => { this.onSearch(orderNo) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (<tr key={index}>
                                <td>
                                    <Link className="opear" to={`/order/detail/${order.orderNo}`}>    {order.orderNo}</Link>
                                </td>
                                <td>
                                    {order.receiveName}
                                </td>
                                <td>
                                    {order.statusDesc}
                                </td>
                                <td>¥{order.payment}</td>
                                <td>{order.createTime}</td>
                                <td>
                                    <Link className="opear" to={`/order/detail/${order.orderNo}`}>详情</Link>
                                </td>
                            </tr>);
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
            </div>
        );
    }
}

export default OrderList;