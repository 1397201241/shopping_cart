import React from 'react'
import {
	Row,
	Card,
	Col,
} from 'antd';
import Item from './Item';


function Chunk(arr=[],size=4,options){
	let groups=[];
	if (arr&&arr.length>0){
		groups=arr.map((e,i)=>(i%size===0?arr.slice(i,i+size):null)).filter(e=>e);
	}
	if (options&&options.autoComplete){
		const lastIndex=groups.length-1;
		if (lastIndex>=0){
			groups[lastIndex]=groups[lastIndex].concat(
				this.getRandomArraySlice(arr.slice(0,size*lastIndex),size-groups[lastIndex].length)
			);

		}
	}
	return groups;
}
function ProductsContainer(props){
	const {
		products,
		qty,
		addCart,
	}=props;
	//console.log(products);

	const goodList=Chunk(products,3);

	if(products.length!==0){
		return (
			<div
				style={{width:1000}}>
				{
					goodList.map((row,rIndex)=>(
						<Row
							type="flex"
							key={`row-${rIndex}`}>
							{
								row.map((item,index)=>(
									<Item
										addToCart={addCart}
										quantity={qty[item.index]}
										source={item.path}
										key={index}
										index={item.index}
										name={item.name}/>
								))
							}
						</Row>
					))
				}
			</div>
		)
	}
	return(

		<Row>

			<Card
				style={{marginTop:10,width:920}}>抱歉，没有找到商品！
			</Card>
		</Row>
	)
}
export default ProductsContainer;