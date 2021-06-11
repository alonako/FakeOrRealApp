import React, { useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import Person from './Person';
import { set } from 'react-native-reanimated';
import {Image,Button,Text,View,TextInput} from 'react-native';

function Play(props) {

  const {jsonDB ,updateDB,updateScore,  dbLoaded } = props; 
  const [id, setId] = useState('');
  const isFocused = useIsFocused();

  useEffect( ()=> {
    if(dbLoaded){
      pickImage();
    }

  },[dbLoaded,isFocused])

  const pickImage = () => {

    let reals = Object.keys(jsonDB['Real']);
    let fakes = Object.keys(jsonDB['Fake']);
    let arr = reals.concat(fakes)
    const id = arr[Math.floor(Math.random() * arr.length)]
    setId(id);
    console.log(id)

  }

  return ( dbLoaded ? <Person jsonDB={jsonDB} id={id} updateDB={updateDB} pickImage={pickImage} updateScore={updateScore} />
    
    : <Text>loading...</Text>
    );

}

export default Play;
