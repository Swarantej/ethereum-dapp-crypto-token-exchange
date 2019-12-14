import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Content from './Content.js';
import Web3 from 'web3'
import { connect } from 'react-redux'
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
} from '../store/interactions'
 //import { accountSelector } from '../store/selectors'
 import { contractsLoadedSelector } from '../store/selectors'


class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token){
        window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.')
        return
    }
    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange){
      window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
      return    
    }

  }

  render() {
   // console.log(this.props.account)
    return (
      <div>
        <Navbar />
        { this.props.contractsLoaded ? <Content /> : <div className="content"></div> }
        </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("contractsLoaded?", contractsLoadedSelector(state))
  return {

    // TODO: Fill me in...
   // account: accountSelector(state)
   contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App)
