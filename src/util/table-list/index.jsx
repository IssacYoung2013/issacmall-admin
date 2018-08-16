import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

// 通用Table组件
class TableList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }

    componentWillReceiveProps() {
        // 列表只有在第一次挂载的时候 显示正在加载
        this.setState({
            isFirstLoading: false
        })
    }

    render() {
        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
            if (typeof tableHead == 'object') {
                return (<th key={index} width={tableHead.width}>{tableHead.name}</th>);
            }
            else if (typeof tableHead == 'string'){
                return (<th key={index}>{tableHead}</th>);
            }
        });

        let listBody = this.props.children;

        let listError = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.firstLoading ? '正在加载...' : '没有找到相应的结果~'}
                </td>
            </tr>
        );

        let tableBody = listBody.length > 0 ? listBody : listError;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableBody
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;