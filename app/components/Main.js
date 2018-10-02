import React from 'react'
import { Section, LevelRight, Button, Container, Box, Title  } from 'bloomer';
import Surveys from './Surveys'

export default () =>{
    return(
      <Section>
       <Container>
        <Box hasTextAlign="centered">
            <Title>DKN Survey Creator</Title>
        </Box>
       <Surveys></Surveys>
       </Container>

       </Section>  
        
   )     
}