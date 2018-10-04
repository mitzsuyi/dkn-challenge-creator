import React from 'react'
import { Section, LevelRight, Button, Container, Box, Title  } from 'bloomer';
import Surveys from './Surveys'
import {WalletHeader} from './Wallet'
import {lifecycle, withProps, withHandlers, withState, compose} from 'recompose'

const Main = ({setAccountBalance, accountBalance}) =>{
    return(
      <div>
            <WalletHeader accountBalance={accountBalance} setAccountBalance={setAccountBalance}/>
          <Section>
           <Container>
            <Box hasTextAlign="centered">
                <Title>DKN Survey Creator</Title>
            </Box>
           <Surveys accountBalance={accountBalance}></Surveys>
           </Container>
           </Section>  
       </div>
        
   )     
}

const enhance=withState("accountBalance", "setAccountBalance", 0)

export default enhance(Main)