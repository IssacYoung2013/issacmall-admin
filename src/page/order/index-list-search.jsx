import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: ''
        };
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    onSearch() {
        this.props.onSearch(this.state.orderNo);
    }

    onSearchKeywordKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    }

    render() {

        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select
                                className="form-control"
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                name="orderNo"
                                className="form-control"
                                placeholder="关键词"
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                onChange={(e) => this.onValueChange(e)} />
                        </div>
                        <button className="btn btn-primary" onClick={(e) => this.onSearch()}>搜索</button>
                    </div>
                </div>
            </div>);
    }
}

export default ListSearch;