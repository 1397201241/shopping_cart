import React,{Component} from "react";
import {
    Row,
    Card,
    Button,
} from "antd";
import  EmptyCart from './EmptyCart'
class Cart extends Component{
    constructor(props) {
        super(props);
        this.state={
            showCart:false,
            cart:[],
            viewChanged:false,
        };
        //bind(this)使函数指向当前类Cart
        this.handleClick=this.handleClick.bind(this);
        this.handleRemove=this.handleRemove.bind(this);

    }
    componentDidMount(){
        /*console.log("<Cart/> has rendered!");
        console.log(this.props.pModel);

         */
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        /*console.log("showCart:"+this.state.showCart);
        console.log("购物车商品："+this.props.selectProducts);
        console.log("购物车商品数量："+this.props.qty);
        console.log(this.props.qty);

         */
    }

    //单击事件
    handleClick(){

        setTimeout(()=>{
            this.setState({
                    showCart:!this.state.showCart
                }
            )},0)
    }
    //从购物车删除
    handleRemove(product,index){
        console.log(this.handleRemove);
        this.props.handleRemove(product,index);
        setTimeout(()=> {
            this.setState({
                showCart: !this.state.showCart
            })
        },100);
        setTimeout(()=>{
            this.setState({
                showCart:!this.state.showCart
            })
        },200);

    }
    render() {

        const {
            showCart
        }=this.state;
        const {
            selectProducts,
            qty,//数量
            pModel,
        }=this.props;

        let cartItems;
        const len=selectProducts.length;
        let totalPrice=0;
        for (let i=0;i<qty.length;i++){
            totalPrice += pModel[i].price*qty[i];
        }
        console.log(totalPrice);
        if(len!==0){
            //index代表索引，product代表索引对应的值
            cartItems=qty.map((product,index)=>{
                if (product===0){
                    return null;
                }
                else{
                    //console.log(pModel[index].name);
                    return (
                        <Card
                            style={{width:1000}}
                            key={pModel[index].name}>
                            <Row type="flex"
                                 style={{float:"left",marginTop:30,marginRight:30}}>
                                <img
                                    style={{cursor:"pointer",width:300,height:250}}
                                    src={pModel[index].path}
                                    alt=""/>
                                <div style={{marginLeft:10}}>
                                    <p>标题：{pModel[index].name}</p>
                                    <p>价格：{pModel[index].price}</p>
                                    <p>数量：{qty[index]}</p>
                                    <p>共计：{product*pModel[index].price}</p>
                                    <Button
                                        style={{marginTop:10}}
                                        danger={true}
                                        onClick={()=>this.handleRemove(product,index)}>
                                        删除
                                    </Button>

                                </div>
                            </Row>
                        </Card>
                    )
                }

            });
        }
        return (
            <div>
                <Button
                    style={{background:"#99ff66"}}
                    onClick={()=>this.handleClick()}>我的购物车
                </Button>

                <Row>
                    {showCart&&len===0?<EmptyCart/>:null}
                    {showCart&&len!==0?<div>
                        <h3>
                            共计：{totalPrice}
                        </h3>
                        <div>
                            {cartItems}
                        </div>
                    </div>:null}
                </Row>
            </div>
        )
    }
}
export default Cart;