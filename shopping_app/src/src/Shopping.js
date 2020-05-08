import React,{Component} from 'react';
import {
	Row,
	Col,
} from 'antd';
import Cart from './Cart';
import ProductsContainer from './ProductsContainer';
import Search from './Search';
import {
	allProducts, //所有商品
	filterProducts, //实际展示
	productsModel,  //商品模型
	allQuantity, //所有库存
	selectQuantity, //加入购物车的数量
} from './constants'
class Shopping extends Component{
	constructor(){
		super();
		this.state={
			qty:allQuantity,
			products:allProducts,
			selectProducts:[],
			selectQty:selectQuantity,
			filterProducts,
		};

		//绑定相关事件
		this.searchItem=this.searchItem.bind(this);
		this.handleRemove=this.handleRemove.bind(this);
		this.addCart=this.addCart.bind(this);
	}
	componentDidMount(){
		console.log("<Shopping/> has rendered!");
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("change?");
	}
	/**
	加入购物车
	**/
	addCart(index){
		const currentQty=this.state.qty;
		const selQty=this.state.selectQty;
		const indexNum=index;
		//库存充足，则购物车的数量加1
		//库存不足，则提示用户已售完
		if(currentQty[indexNum]>0){
			currentQty[indexNum]--;
			selQty[indexNum]++;
			
		}else{
			alert("很抱歉，已售完");
		}
		const{
			selectProducts,
			products,
		}=this.state;
		const cart=selectProducts;
		const item=products[indexNum];
		cart.push(item.name);
		//更新状态

		this.setState({
			selectProducts:cart,
			selectQty:selQty,
			qty:currentQty,
		});
	}
	/**
	搜索商品
	**/
	searchItem(itemName){
		let findItem=false;
		//空处理
		if(itemName===""){
			this.setState({
				filterProducts:productsModel,
			});
			console.log("NULL!");
		}else{

			for(let i=0;i<productsModel.length;i++){
				if(productsModel[i].name===itemName){
					console.log("FIND!");
					const tmpProducts=[];
					tmpProducts.push(productsModel[i]);
					console.log(tmpProducts);
					this.setState({
						filterProducts:tmpProducts,
					});
					findItem=true;
					break;
				}
			}
		}
		if(!findItem){
			const cantFind=[];
			this.setState({
				filterProducts:cantFind,
			});
			console.log("cant find product!");
		}
	}
	/**
	从购物车中删除
	**/
	handleRemove(quantity,id){
		const originalQty=[10,8,15,5,9,20];
		const selProducts=this.state.selectProducts;
		console.log(selProducts);
		const pname=productsModel[id].name;
		for(let i=0;i<selProducts.length;i++){
			const index=selProducts.indexOf(pname);
			if(index>-1){
				selProducts.splice(index,1);
			}
		}
		const selQty=this.state.selectQty;
		selQty[id]=0;
		const tmpQty=this.state.qty;
		tmpQty[id]=originalQty[id];
		//更新购物车状态
		this.setState({
			selectProducts:selProducts,
			selectQty:selQty,
			qty:tmpQty,
		});
	}
	/**
	渲染UI
	**/
	render(){
		return(
			<div>
				<Row>
					<Col>
						<Search
							searchItem={this.searchItem}/>
						<ProductsContainer
							addCart={this.addCart}
							products={this.state.filterProducts}
							qty={this.state.qty}/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Cart
							handleRemove={this.handleRemove}
							selectProducts={this.state.selectProducts}
							qty={this.state.selectQty}
							pModel={this.state.products}/>
					</Col>
				</Row>
			</div>
		)
	}
}
export default Shopping;