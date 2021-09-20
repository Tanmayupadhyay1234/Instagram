import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase'
require('firebase/auth');
import {View,Text } from 'react-native'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))
import MainScreen from './components/Main'

var firebaseConfig = {
  apiKey: "AIzaSyDolvPvtwz6w39qyGJBiJoZuUegTABZtN0",
  authDomain: "instagram-demo-bd7ec.firebaseapp.com",
  projectId: "instagram-demo-bd7ec",
  storageBucket: "instagram-demo-bd7ec.appspot.com",
  messagingSenderId: "389250985155",
  appId: "1:389250985155:web:55fb77b89c5440faeac676",
  measurementId: "G-6V2CGGH625"
}; 



const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded:true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded:true,
        })
      }
    })
  }
  render() {
    const { loggedIn , loaded } = this.state;
    if(!loaded){
      return( 
        <View style={{flex:1, justifyContent:'center'}}>
          <Text>Loading</Text>
        </View>
      )
    } 

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
    
        </NavigationContainer>
      );

    }

    return( 
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>
          </Stack.Navigator>
      </Provider>
    )
  }
}

export default App




