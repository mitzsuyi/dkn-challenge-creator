import React from 'react'
import { LevelLeft, Label, Level, LevelRight, Container, Panel,PanelHeading, PanelBlock, Button} from 'bloomer';
import {withState, compose, withProps, withHandlers} from 'recompose'
import Question from './Question'
import AddQuestion from './AddQuestion'
import List from '../List'

import {objectLength} from '../../utils'

const MAX_QUESTIONS = 5

const Questions=({questions, canAddMoreQuestions, addQuestion, mapper, removeQuestion})=>(
    <Container>      
    <Level>
          <LevelLeft><Label>Questions</Label></LevelLeft>
          {canAddMoreQuestions && <AddQuestion addQuestion={addQuestion}/>}
    </Level>
    <List collection={questions}  mapper={mapper(removeQuestion)}></List>
   </Container>
)

const enhance = compose(
  withHandlers({
    mapper: props => removeQuestion => (question, attributes) => <Question removeQuestion={removeQuestion} question={question} {...attributes}/>,
    addQuestion: ({survey, updateQuestions}) => (question) => {
      survey.addQuestion(question)
      updateQuestions()
    },
    removeQuestion: ({survey, updateQuestions}) => (questionId) =>{
      survey.removeQuestion(questionId)
      updateQuestions()
    }
  }),
  withProps( ({survey}) => {
    return {
       questions: survey.questions,
       canAddMoreQuestions: objectLength(survey.questions) < MAX_QUESTIONS
    }
 })
)

export default enhance(Questions) 