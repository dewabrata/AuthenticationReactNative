/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import Register from './components/screen/register';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/screen/login';
import { NavigationContainer } from '@react-navigation/native';
import test from './test';
import Home from './components/screen/home';



const Stack = createStackNavigator();

class App extends Component {

  createLogin = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}  />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} navigation={this.props.navigation} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }

  createHome = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          < Stack.Screen name="Home" component={test} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  state = {
    status: false
  }

  render() {
    if (this.state.status === false) {
      return (
        this.createLogin()
      )
    } else {
      return (
        this.createHome()
      )
    }
  }
}


export default App;
