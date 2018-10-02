import store from 'store'

const SURVEY_STORE_NAME="DKN-CREATE-SURVEY-STORE"

import ids from '../utils/ids'
import {add, update} from '../utils/collection'
import Questions from '../collections/questions'
import {isEmptyObject} from '../utils'

const isPositiveInteger = function(string){
  const number = int(string)
  return Number.isInteger(number) && number > 0
}
const int=(text)=>Number.parseInt(text)
const Survey = function({
    id= ids.next(), 
    tokensRewarded=0, 
    participantSize=0, 
    name="", 
    questions=Questions.initial, 
    store: store}){
  let self = {}   
  const save = (survey) => store.update(survey)
  const setQuestions =  (questions) => { self.questions = questions; save(self) }
  return Object.assign(self,{
     name: name,
     id: id,
     tokensRewarded: tokensRewarded,
     participantSize: participantSize,
     questions: questions,
     submissionFee:()=>{
        return int(self.tokensRewarded) * int(self.participantSize)
     },
     isValid: () => {
        return self.name.length > 0 && !isEmptyObject(self.questions) &&
        isPositiveInteger(self.tokensRewarded) && isPositiveInteger(self.participantSize)
     },
     setProp:  (prop, value) => { self[prop] = value; save(self)},
     removeQuestion: (questionId) => setQuestions(Questions.remove(self.questions, questionId)),
     addQuestion: (question) => setQuestions(Questions.add(self.questions, question))
  })
}

const SurveyStore =function() {
    let self = {}
    const SurveyConstructor = (survey)=> new Survey(Object.assign(survey || {}, {store: self}) )
    return Object.assign(self, {
    newSurvey: () => new Survey({store: self}),
    get:(id)=> SurveyConstructor(self.all()[id]),
    surveys: () => Object.values(self.all()).map((survey)=> SurveyConstructor(survey)),
    all: () => store.get(SURVEY_STORE_NAME) || {},
    add: (survey) => store.set(SURVEY_STORE_NAME, add(self.all(), survey)),
    update: (survey)=> store.set(SURVEY_STORE_NAME, update(self.all(), survey))  
  })
}

const surveyStore = new SurveyStore()

export default surveyStore