import React,{Component} from "react";
import {
    Row,
    Col,
    Input,
    Button,
} from "antd";
class Search extends Component{
    handleClick(){
        //获取输入框的值
        const search=document.getElementById('search').value;
        this.props.searchItem(search);
    }
    render() {
        return (
            <Row>
                <Col>
                    <Input id="search" placeholder="请输入" style={{width:350}}/>
                    <Button
                        type="primary"
                        onClick={()=>this.handleClick()}
                        style={{marginLeft:10}}>
                        搜索
                    </Button>
                </Col>

            </Row>
        );
    }
}
export default Search;