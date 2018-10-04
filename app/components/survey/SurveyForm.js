import React from 'react'
import { Field,Level,LevelLeft,LevelRight,Tag, Button, Help, Label, Input, Control, Container} from 'bloomer';
import SurveyQuestions from './SurveyQuestions'
import {withState, withProps, compose, withHandlers} from 'recompose'

const SurveyForm = ({survey, submissionFee, balanceSufficient, isValidSurvey, tokensRewarded, participantSize, isValid, setSurveyProp, updateQuestions, doneEditing})=> <Container >            
    <Field>
       <Label>Survey Name</Label>
       <Control> 
        <Input isColor='success' placeholder='Name' value={survey.name}  onChange={setSurveyProp("name", "setName")} />
       </Control>
    </Field>
  <Field>
  <Field>
    <Label>Reward</Label>
    <Control>
      <Input type="number" min="1" value={survey.tokensRewarded} onChange={setSurveyProp("tokensRewarded", "setTokensRewarded")} placeholder="number tokens given for taking survey"></Input>
    </Control>
    <Help isColor='info'>Must be integer greater than 0</Help>  
  </Field>  
  <Field>
    <Label>Participant Size</Label>
    <Control>
      <Input type="number" min="1" value={survey.participantSize} onChange={setSurveyProp("participantSize", "setParticipantSize")} placeholder="max number of who will take survey"></Input>
    </Control>
      <Help isColor='info'>Must be integer greater than 0</Help>  
  </Field>  
    <SurveyQuestions survey={survey} updateQuestions={updateQuestions}></SurveyQuestions> 
 </Field>
   <Field>        
    <Control>
      <Level>
        <LevelLeft>
          <Button isStatic={!isValidSurvey} onClick={()=> doneEditing() } isColor='success'>Done</Button>
        </LevelLeft>
       { isValidSurvey && <LevelRight>
          <Tag>submission fee {submissionFee} tokens</Tag>
          {!balanceSufficient &&
           <Tag isColor="danger">Balance insufficient</Tag>
          }
        </LevelRight>
      }  
      </Level>
    </Control>
   </Field>
  </Container> 

const enhance = compose(
  withState("name", "setName", ""),
  withState("participantSize", "setParticipantSize", 0),
  withState("tokensRewarded", "setTokensRewarded", 0),
  withState("questions", "setQuestions", []),
  withProps(({survey, hasEnoughBalance})=>({
    submissionFee: survey.submissionFee(), 
    isValidSurvey: survey.isValid(),
    balanceSufficient: hasEnoughBalance(survey.submissionFee())
  })),
  withHandlers({
      setSurveyProp: props => (prop, updater) => evt => { 
        const value = evt.target.value;
        props.survey.setProp(prop, value); 
        props[updater](value)
      },
      updateQuestions: props => () => props.setQuestions(props.survey.questions)
  })
)

export default enhance(SurveyForm)