import React from 'react'
import { Navbar, Content, Field, Control, Select, Label, NavbarItem, Tag, NavbarBrand, NavbarMenu, NavbarEnd } from 'bloomer';

import EmbarkJS from 'Embark/EmbarkJS'
import {lifecycle, withProps, withHandlers, withState, compose} from 'recompose'

import walletStore from '../stores/wallet'

const setError = function(err){
   this.setState({error: err.message || err});
}

const enhance=compose(
  withState("accounts","setAccounts", []), 
  withState("currentAccount","setCurrentAccount", undefined), 
  withState("error","setError", ""), 
  withHandlers({
    setCurrentAccount: ({setAccountBalance, setCurrentAccount}) => async (account) =>{
      walletStore.setCurrentAccount(account)
      const balance = await walletStore.getAccountBalance(account)   
      setAccountBalance(balance)
      setCurrentAccount(account)
    }
  }),
  withProps(props=>{
    return {
        hasError: props.error.length > 0
    }
  }),
  lifecycle({
    componentWillMount: function(){
      try {  
          EmbarkJS.onReady(async (err)=>{
          const storageIsAvailable=await EmbarkJS.Storage.isAvailable()
          const accounts = await walletStore.getAccounts()  
          const currentAccount = walletStore.getCurrentAccount()
          this.setState({accounts: accounts})        
          this.props.setCurrentAccount(currentAccount)
        })     
      } catch(error) {
        console.error('error', error)
        setError.call(this, error)
      }
   } 
  })
)

const WalletHeader = enhance( ({accountBalance, setCurrentAccount, accounts, error, hasError}) => (
<Navbar style={{ border: 'solid 1px #00D1B2' }}>
<NavbarBrand>
    <NavbarItem>
        DKN Wallet
    </NavbarItem>
</NavbarBrand>
<NavbarMenu>
      {hasError && 
        <NavbarEnd>            
        <NavbarItem>
         <Tag isColor='danger'>{error}</Tag>            
        </NavbarItem>   
        </NavbarEnd> 
     }
     {!hasError && 
       <NavbarEnd>
                   <NavbarItem>
           <Field>
            <Label>Accounts:</Label>
            <Control>
                <Select onChange={(evt)=> setCurrentAccount(evt.target.value)}>                    
                    {accounts.map((account,index)=><option key={index}>{account}</option>)}
                </Select>
            </Control>
          </Field>
        </NavbarItem>
        <NavbarItem>
            <Field>
                <Label>Balance:</Label>
               <Content>{accountBalance}</Content>
            </Field>
        </NavbarItem>
        </NavbarEnd>
     }
</NavbarMenu>
</Navbar>
) ) 

export {
    WalletHeader
}