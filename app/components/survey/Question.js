import React from 'react'
import { PanelBlock, Container, Delete, Level, LevelLeft, LevelRight} from 'bloomer';

const Question = ({question, removeQuestion}) => <PanelBlock>
        <Container>
            <Level>
                <LevelLeft>{question.question}</LevelLeft>
                <LevelRight><Delete onClick={()=>removeQuestion(question.id) }/></LevelRight>
            </Level>
        </Container>
     </PanelBlock>   
export default Question