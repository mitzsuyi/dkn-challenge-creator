import ids from '../utils/ids'
import {add, remove} from '../utils/collection'

function Question(question){
    return {
        id: ids.next(),
        question: question
    }
}

const Questions = {
    initial: {},
    add: (collection, question) => add(collection, new Question(question)),
    remove: (collection, questionId) => remove(collection, questionId)
}

export default Questions