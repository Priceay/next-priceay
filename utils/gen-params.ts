function genrateFilterUrl(arr:{id:number}[]){
    
    let arrWithId= arr.map((id,i)=>{
    return `filters[id][$in][${i}]=${id.id}`
        
    })
    
    return arrWithId
}

export default genrateFilterUrl