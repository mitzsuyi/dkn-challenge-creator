import React from 'react'
import {withState, compose, withHandlers, withProps} from 'recompose'
import { LevelRight, Level, LevelLeft, Button,  Container} from 'bloomer';
import CreateSurveyForm from './survey/CreateSurveyForm'
import SurveyList from './survey/SurveyList'
import EditSurvey from './survey/EditSurvey'

import surveyStore from '../stores/survey'

const VIEW="view"
const CREATE="create"
const LIST="list"
const EDIT= "edit"

const enhance = compose(
 withState('mode', 'setMode', LIST),
 withState('surveyId', 'setSurveyId', LIST), 
 withState('surveys', 'setSurveys', surveyStore.surveys()), 
 withHandlers({
    newSurvey: props => () => surveyStore.newSurvey(),
    submitSurvey: props=> (survey) => console.log('submit survey'),
    addSurvey:props => (survey)=> surveyStore.add(survey),
    editSurvey: ({setMode, setSurveyId}) => (surveyId) => {setSurveyId(surveyId); setMode(EDIT)},
    getCurrentSurvey: props => () => surveyStore.get(props.surveyId)
 }),
 withProps( ({surveys, mode}) => {
    return {
        isListMode: mode == LIST,
       isCreateMode: mode == CREATE ,
       isViewMode: mode == VIEW,
       isEditMode: mode == EDIT,
       hasSurveys: surveys.length > 0
    }
 })
)

const CreateSurvey = ({setMode}) => <LevelRight>
      <Button onClick={()=> setMode(CREATE)} isColor='success' isOutlined>Create A Survey</Button>            
    </LevelRight>

const Header = ({hasSurveys}) => <Level>
    <LevelLeft>
      Surveys        
    </LevelLeft> 
    {!hasSurveys && CreateSurvey}  
  </Level>


const Surveys = enhance(({isListMode, isEditMode, submitSurvey, getCurrentSurvey, surveys, hasSurveys, editSurvey, isCreateMode, setMode, addSurvey, newSurvey}) =>
  <Container>
   {isListMode && !hasSurveys && <CreateSurvey setMode={setMode}/>}  
   {isCreateMode && <CreateSurveyForm submitSurvey={submitSurvey} newSurvey={newSurvey} addSurvey={addSurvey}/>}       
   {isListMode && hasSurveys && <SurveyList submitSurvey={submitSurvey} surveys={surveys} editSurvey={editSurvey}/>}
   {isEditMode && <EditSurvey submitSurvey={submitSurvey} getCurrentSurvey={getCurrentSurvey}/>}
  </Container>  
)    

export default Surveys
