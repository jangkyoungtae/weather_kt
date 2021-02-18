import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from "axios";
import Weather from './Weather';

const API_KEY ="1ff092fbcb045a838aa66066f0eda15f";
export default class App extends React.Component {
  state={
    isLoading: true,
  };
  getWeather = async(lon ,lat)=>{
    const {
      data:{
        main:{temp},
        weather
      }
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    console.log(temp);
    this.setState({
      isLoading:false,
      temp,
      weather:weather[0].main,
    })
  };
  getLocation = async() =>{
    try {
      await Location.requestPermissionsAsync();
      const {coords:{longitude, latitude}} = await Location.getCurrentPositionAsync();
     
      
      this.getWeather(longitude ,latitude);
      this.setState({
        isLoading:false,
      });
    } catch (error) {
      Alert.alert("Can's find you.","So sad");
    }
  
  }
  componentDidMount(){
    this.getLocation();
  }
  render (){
    const{isLoading,temp,weather} = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} weather={weather}/>;
  }
}


