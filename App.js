import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal } from 'react-native';
import S1 from './screens/S1';
import S2 from './screens/S2';
import S3 from './screens/S3';
import { Provider } from 'react-redux';
import {store,persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist/es/persistStore';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const persistor=persistStore(store);
const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Nimbus" component={S1} 
      screenOptions={() => ({
        tabBarShowLabel: false,
    })}/>
    <Tab.Screen name="Convert" component={S3} />
  </Tab.Navigator>
);

const Stacks = ()=>{
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
  <Stack.Screen name="Screen1" component={S1}  />
  <Stack.Screen name="Screen2" component={S2} />
 </Stack.Navigator>

  );
}

const App = () => (

          <NavigationContainer>
          <Tabs/>
         
</NavigationContainer>

 

);

export default () => {
  return (
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <App />
            </PersistGate>
   
    </Provider>
  );
};
const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    color:'black',
    textAlign:'center',
    justifyContent:'center',
  },
  modal:{
    flex:1,
    justifyContent:'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    

  },
  input:{
    width:250,
    borderColor:'black',
    borderWidth:1,
    padding:5,
    margin:5,
    textAlign:'center',
    color:'black'
    
  },
  closeButton:{
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:'red',
    color:'white',
    width:100,
    textAlign:"center",
    fontSize:20

  }

});