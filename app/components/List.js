import React from 'react'
import { Panel} from 'bloomer';

const List = ({collection, mapper}) => <Panel>   
      {Object.entries(collection).map(([id, entry])=> mapper(entry, {id: id, key: id}) )}
 </Panel> 

export default List