import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HighScores from './src/components/HighScores';
import Play from './src/components/Play';
import React, { useState, useEffect} from 'react';
import {db} from './src/firebase'

const Tab = createBottomTabNavigator();

export default function App(props) {

  const [jsonDB, setJsonDB] = useState([]);
  const [score,setScore] =useState(0);
  const [playerName,setName] =useState('');
  const [stats,setStats] = useState([]);
  const [dbLoaded,setDBLoaded] = useState(false);


  useEffect(() => {
    console.log('APP / use effect db update')

    db.ref('/').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      setJsonDB(data);
      setDBLoaded(true);
    });
},[]);

const updateScore = (scoreToAdd) => {
  const updatedScore =score+scoreToAdd;
  setScore(updatedScore);

}

const updateStats = (stats) => {
  let updatedJsonDB = jsonDB;
  updatedJsonDB['Score'] = stats;
  putRequesteInDB(updatedJsonDB);
}


const handleDBUpdate = (act,id) => {
  console.log('handilng db update')
  const opp_act = act == 'Fake' ? 'Real' : 'Fake'
  const data = jsonDB
  const item = data[act][id];
  if(item != undefined){
    item['shows']++;
    item['correct']++;
  }
  else if(data[opp_act][id] !=undefined){
    data[opp_act][id]['shows']++;
    data[opp_act][id]['wrong']++;
  }
  if (playerName !== ''){
    data['Score'][playerName] = score;
  }

  putRequesteInDB(data)
  }

const putRequesteInDB = (data) => {
  console.log('put req in db ')

  db.ref('/').set(data);
  setJsonDB(data)
}

  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Play">
        {props => <Play {...props} jsonDB={jsonDB} updateDB={handleDBUpdate} updateScore={updateScore}  dbLoaded={dbLoaded}  />}
        </Tab.Screen>
        <Tab.Screen name="HighScores">
        {props => <HighScores {...props} score={score}  updateName={setName} putRequesteInDB={putRequesteInDB} updateStats ={updateStats} jsonDB={jsonDB} dbLoaded={dbLoaded} />}
        </Tab.Screen>
        </Tab.Navigator>


    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

