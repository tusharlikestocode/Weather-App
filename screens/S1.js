import React, {  useEffect, useState   } from 'react'
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable,ScrollView,ImageBackground } from 'react-native';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setHum,setTemp,setWind,setlocation,setdate } from '../store/messageSlice';
import { blue } from '@mui/material/colors';

const S1 = ({ navigation })=>{
    const dispatch = useDispatch();
    const [locate,setLocation]=useState("");
    const { temperature } = useSelector((state) => state.reducer.message);
    const { humidity } = useSelector((state) => state.reducer.message);
    const { location } = useSelector((state) => state.reducer.message);
    const { date } = useSelector((state) => state.reducer.message);

  
    const { wind } = useSelector((state) => state.reducer.message);
    // const [modalVisible, setModalVisible] = useState(false);
    const [data,setData]=useState(['Loading..','Loading',['Loading']]);
    const [currentTemp,setCurrentTemp]=useState('null');
    const [currentHumidity,setHumidity]=useState('null');
    const [wmph,setwmph]=useState('null');
    const [err,seterr]=useState(false);
    // const [date,setDate]=useState(null);
    const d=new Date();

    // const { message } = useSelector((state) => state.message);
    const _storeData = async () => {
      try {
        await AsyncStorage.multiSet(
          [['Temperature',currentTemp.toString()],['Humidity',currentHumidity.toString()],['Wind',wmph.toString()],['Location',location.toString()],['Date',d.toString()]]
         
        );
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    };
    useEffect(()=>{
      _retrieveData =  () => {
        try {
          AsyncStorage.multiGet(['Temperature','Humidity','Wind','Location','Date']).then((value)=>{
            setData(value)
            seterr(true);
            return(
              <View style={styles.recent}>
              <Text style={styles.recentHeader}>Last Checked:</Text>
              <Text style={styles.recentText}>
                
                Location:{value[3][1]}{'\n'}
                Temperature:{value[0][1]}°C{'\n'}
                Humidity:{value[1][1]}%{'\n'}
                Wind:{value[2][1]}mph{'\n'}
                Time:{value[4][1]}
      
      
      
              </Text>
            </View>
            );

          })
          
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };


      _retrieveData();






    },[]);
    const getWeather = async () => {
      
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: locate},
            headers: {
              'X-RapidAPI-Key': '0e5e93959fmsh75f266417b19520p1ba5cdjsnc5923ce3a50b',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        axios
          .request(options)
          .then(function (response) {
            // console.log(response.data.condition)
            const {current}=response.data;
            // console.log(current)
            // console.log(current.temp_c)
            setCurrentTemp(current.temp_c)
            setHumidity(current.humidity);
            setwmph(current.wind_mph);
            // dispatch(setMessage(currentTemp));
            dispatch(setTemp(currentTemp));
            dispatch(setHum(currentHumidity));
            dispatch(setWind(wmph));
            dispatch(setlocation(locate));
            dispatch(setdate(d.toString()));
            // dispatch(setlocation(locate));
            _storeData();
            
          
          
        })
          .catch(function (error) {
            console.error(error);
            // seterr(true);
            Alert.alert('Invalid Input','Please try again with valid input',[
              {text:'Cancel',
            onPress:()=>{
              console.log('Cancel Pressed')
            },
            style:'cancel'
          },{
            text:'OK',
            onPress:()=>{
              console.log('OK Pressed');
            },

          }
            ])
          });
          };





    // AsyncStorage.getItem('Weather',(err,result)=>{
    //     setData(result);
    //     console.log(result)
    // }
    // );

  return (
    <ScrollView>
     <View style={ styles.layout }>
      {/* <Text style={{backgroundColor:message}}></Text> */}
      <Text style={styles.title}>Enter your Location(City)</Text>

      <TextInput
      style={styles.input}
      placeholder='Your Name'
      value={locate}
      onChangeText={(locate)=>{setLocation(locate)}}
      />

      <Button
      title='Get Current Weather'
      onPress={() =>{
        getWeather(locate);
        _retrieveData();
        navigation.navigate('Convert');
        // err!==true? navigation.navigate('Convert'):navigation.navigate('Nimbus');
      } }
      />
        </View>

      <View style={styles.recent}>
        <Text style={styles.recentHeader}>Last Checked:</Text>
        <Text style={styles.recentText}>
          
          Location:{location}{'\n'}
          Temperature:{temperature}°C{'\n'}
          Humidity:{humidity}%{'\n'}
          Wind:{wind}mph{'\n'}
          Time:{date}



        </Text>
      </View>
      
      
  
    </ScrollView>
   
    
  
  
    
  );
  }

export default S1
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
  
    },recent:{
      borderColor:'blue',
      borderWidth:2,
      margin:10,
      borderRadius:10,
      marginTop:40,
      


    },recentHeader:{
      backgroundColor:'blue',
      textAlign:'left',
      fontSize:30,
      color:'white',
      fontWeight:'500',
      padding:10
      
      
      
    },
    recentText:{
      textAlign:'left',
      fontSize:25,
      fontStyle:'italic',
      padding:10,


      
    }
  
  });
