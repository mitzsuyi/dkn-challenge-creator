import React from 'react'
import { PanelBlock, Container, Tag, Columns, Column, Button, Level, LevelLeft, LevelRight} from 'bloomer';
import {withProps} from 'recompose'
import {objectLength} from '../../utils'

const Survey = ({canSubmit, survey, submitSurvey, editSurvey}) => (
    <PanelBlock>
        <Container>
            <Level>
                <LevelLeft>
                    <Columns><Column>{survey.name}</Column><Column><Tag isColor="info">{objectLength(survey.questions)} question(s)</Tag></Column></Columns></LevelLeft>
                <LevelRight>
                    <Columns><Column> 
                        <Button isColor="primary" onClick={()=>editSurvey(survey.id) }>Edit</Button>
                     </Column>
                    {canSubmit && 
                     <Column>
                        <Button isColor="success" onClick={()=>submitSurvey(survey)}>Submit (cost {survey.submissionFee()} tokens)</Button>
                      </Column>
                    }
                </Columns>
                </LevelRight>
            </Level>
        </Container>
     </PanelBlock>   
)

const enhance = withProps(({survey})=>{
    return {
        canSubmit: survey.isValid()
    }
})
export default enhance(Survey)