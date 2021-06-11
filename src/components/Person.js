import React, {useState,useEffect} from 'react';
import {Image,Button,Text,View} from 'react-native';
import {Card} from 'react-native-elements';


function Person(props){

  const {jsonDB ,id,updateDB,pickImage,updateScore} = props;
  const [message, setMessage] = useState({
    result: '',
    points: '',
    percentage: ''
    });
  const [loaded, setLoaded] = useState(false);

  const handleClick = (act,id) =>{
    let m = jsonDB[act][id] != undefined ? 'Correct!' : 'Wrong!'
    let percentage_message =''
    let points = ''
    if (m === 'Correct!'){
      let percentage_c = 0
      const shows_c = jsonDB[act][id]['shows'] + 1
      if(shows_c!=0)
        percentage_c = ((jsonDB[act][id]['correct'] +1) / shows_c) * 100
      points = ' +10 points\n'
      percentage_message = ''+ percentage_c + '% were correct'
      updateScore(10);
    }
    else{
      const opp_act = act === 'Fake' ? 'Real' : 'Fake'
      console.log(jsonDB[opp_act][id]?.['wrong'])
      const shows = jsonDB[opp_act][id]['shows'] +1
      let percentage = 0
      if(shows!=0)
        percentage = ((jsonDB[opp_act][id]['wrong']+1) / shows) * 100
      console.log(percentage)
      points = ' -2 points\n'
      percentage_message = ''+percentage + '% were wrong'
      updateScore(-2);
    }

    setMessage({percentage: percentage_message, points: points, result: m})
    updateDB(act,id)
    setTimeout(() => {pickImage()}, 1000)
    setTimeout(() => {setMessage({
      result: '',
      points: '',
      percentage: ''
      })}, 1500)

  } 

 return ( 

<Card>
  <Card.Title>Real Or Fake?...</Card.Title>
  <Card.Divider/>
    <Text>{ loaded === false ? "loading...": ''} </Text>

        <Image
        style={{margin:'5%',resizeMode: 'center' , width: "90%", height: "20em", display: loaded ? '' : 'none'}}

        source={{
          uri: `https://drive.google.com/uc?export=view&id=${id}`,

        }}

          onLoad={() => {    
          console.log('loaded');
          setLoaded(true)}}
          onError={(error) => {console.log('loadinf',error)}}
        />
        <Text style={{ color: message.result === 'Correct!' ? 'green' : 'red' ,textAlign: 'center' , fontWeight: 'bold'}}>{message.result + message.points}</Text>

        <Text style={{ textAlign: 'center' , fontWeight: 'bold'}}>{message.percentage}</Text>

        <View
  style={{
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: 10
  }}
>
  <View style={{ flex: 1, marginRight: 10 }}>
  <Button color='#000080' title='Fake' onPress={() => handleClick('Fake',id) }/>  
  </View>
  <View style={{ flex: 1 , marginLeft: 10}}>
  <Button color='#000080' title='Real' onPress={() => handleClick('Real',id) }/> 
  </View>
</View>
      
</Card>
);
  
}
export default Person;
