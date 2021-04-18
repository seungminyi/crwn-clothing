import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/hompage.component';
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'

import { auth } from './firebase/firebase.util'
const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      crrentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ crrentUser: user });
      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div className="App" >
        <Header crrentUser={this.state.crrentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/hats' component={HatsPage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }

}

export default App;
