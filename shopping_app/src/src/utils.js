
export default {
    //从数组arr中取出随机count项
    getRandomArraySlice(arr,count){
        const newArr=[].concat(arr);//返回arr数组的副本，concat方法不会改变原数组
        for (let i=0,len=newArr.length;i<len;i++){
            const x=Math.floor(Math.random()*count);
            //swap
            const tmp=newArr[x];
            newArr[x]=newArr[i];
            newArr[i]=tmp;
        }
        return newArr.slice(0,count);
    },
    //把一个数组切成size份，支持不够时自动取随机数填充
    arrayChunk(arr=[],size=4,options){
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
    },
}