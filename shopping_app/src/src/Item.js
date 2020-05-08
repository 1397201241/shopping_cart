import React,{Component} from 'react'
import {
	Row,
	Button,
	Card,
} from 'antd'
class Item extends Component{

	handleClick(){
		this.props.addToCart(this.props.index);
		console.log("add product:"+this.props.name);
	}
	render(){
		const {
			name,
			index,
			source,
			quantity,
		}=this.props;
		const popId=name+index;
		return(
			<Card
				bodyStyle={{padding:0}}
				style={{
					width:302,
					marginTop:10,
					marginRight:10
				}}>
				<Row
					type="flex"
					align="middle"
					justify="center"
					style={{marginBottom:10,height:250}}
					>
					<img
						src={source}
						alt=""
						style={{cursor:"pointer",width:300}}
						data-toggle='modal'
						data-targer={`#${popId}`}/>
				</Row>
				
				<Row
					style={{margin:10}}>
					<h3>{name}</h3>
					<h3>剩余库存：{quantity}</h3>
				</Row>
					
				<Row
					align="middle"
					justify="center"
					type="flex"
					style={{marginBottom:10}}>
					<Button
						onClick={()=>this.handleClick()}
						type="primary">加入购物车</Button>
				</Row>
			</Card>
		)
	}
}
export default Item;