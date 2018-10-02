
function add(collection, object){
    return Object.assign(collection, {[object.id]: object})
}

function remove(collection, objectId) {
  let {[objectId]:_,...rest} = collection
  return rest
}

function update(collection, object) {
  return Object.assign(collection, {[object.id]: object})
}

export {
    add, remove, update
}