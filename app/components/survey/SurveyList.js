import React from 'react'
import List from '../List'
import Survey from './Survey'
import { LevelLeft, Panel, Level, Container} from 'bloomer';

const SurveyList = ({surveys, submitSurvey, editSurvey}) => 
<Container>      
    <Level>
          <LevelLeft>Surveys</LevelLeft>
    </Level>
    <Panel>        
      {surveys.map((survey)=> <Survey key={survey.id} editSurvey={editSurvey} submitSurvey={submitSurvey} survey={survey} />)}
    </Panel>
</Container>

export default SurveyList