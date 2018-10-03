import React from 'react'
import { Section, LevelRight, Button, Container, Box, Title  } from 'bloomer';
import Surveys from './Surveys'
import {WalletHeader} from './Wallet'

export default () =>{
    return(
      <div>
            <WalletHeader/>
          <Section>
           <Container>
            <Box hasTextAlign="centered">
                <Title>DKN Survey Creator</Title>
            </Box>
           <Surveys></Surveys>
           </Container>
           </Section>  
       </div>
        
   )     
}