import store from 'store'
import DKNToken from 'Embark/contracts/DKNToken';

const DKN_WALLET_STORE_NAME="DKN-WALLET-STORE"

const WalletStore = function(){
   let self = {}   
   let accounts = []
   const getWalletStore = ()=>{
    return store.get(DKN_WALLET_STORE_NAME, {})
   }
   const setCurrentAccount= (account)=> {
     store.set(DKN_WALLET_STORE_NAME, Object.assign(getWalletStore(), {currentAccount: account}))
   } 
   const getCurrentAccount = ()=>{
     return getWalletStore().currentAccount
   }
   return Object.assign(self,{
      getAccounts: async ()=> accounts = await web3.eth.getAccounts(),
      setCurrentAccount: (account) => setCurrentAccount(account),
      getCurrentAccount: () => {
        let currentAccount = getCurrentAccount()
        const account = (accounts.includes(currentAccount) && currentAccount) || accounts[0] 
        if (currentAccount != account){
            self.setCurrentAccount(account)
        }
        return account
      },
      getAccountBalance: (account) => account && DKNToken.methods.balanceOf(account).call()
    })
}

const walletStore = new WalletStore()
export default walletStore