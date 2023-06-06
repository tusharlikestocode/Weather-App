import { configureStore,combineReducers } from '@reduxjs/toolkit';
import messageReducer from './messageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
// import { Storage } from 'redux-persist/lib/types';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }
  const rootReducer = combineReducers({ 
    message: messageReducer    
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: {
    reducer: persistedReducer 
    // message: messageReducer 
       
 }
});
export const persistor = persistStore(store)
