

export const cleanObject = (updatedObj) =>{
     
    return Object.entries(updatedObj).reduce((acc, [key,value]) =>{
      if(value !==undefined) acc[key] = value;
      return acc
    },{})
}