const isEmptyObject = (object)=>{
    return Object.keys(object).length == 0
}
const objectLength = (object) => Object.keys(object).length
export {
    isEmptyObject,
    objectLength
}