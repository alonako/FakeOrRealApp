import React, { useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import {Image,Button,Text,View,TextInput,Header} from 'react-native';
import Table from './Table';
import styled from "styled-components";
import { StyleSheet} from 'react-native';



const Styles = styled.div`
  padding: 1rem;

  table {
    background-color:#fff;
    margin:0 auto;
    text-align: center;
    font-family:arial;
    font-size:1.3em;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;





function HighScores(props) {
  const {score, updateName, putRequesteInDB,updateStats, jsonDB,dbLoaded } = props;
  const isFocused = useIsFocused();
  const [name, onChangeName] = useState("");
  const [clicked,setClicked] = useState(false);

  const [data,setData] = useState([]);

  useEffect(() => {
    console.log('STAS/ use effect')

  }, [isFocused]);


  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Score",
        accessor: "score"
      }

    ],
    []
  );

  function compare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }
  
  useEffect( ()=> {
    if(dbLoaded){
      let jsonStat = jsonDB['Score'];
      let updatedStat = []
      console.log(Object.keys(jsonStat))
      Object.keys(jsonStat).forEach(function(key) {
        updatedStat = updatedStat.concat([{rank:1, name:key, score: jsonStat[key]}])
      })

      let sortedStats = updatedStat.sort( compare );

      console.log(sortedStats)
      setData(sortedStats);
    }

  },[dbLoaded])


  useEffect(() => {
    console.log('STATS / use effect')

    if(clicked == true){
      if (name !== "") {
        updateName(name);
        console.log(data)
        const updatedStat = data.concat([{rank:data.length+1, name:name, score: score}])
        let jsonStat = jsonDB['Score'];
        for (let i =0; i<updatedStat.length; i++){
          jsonStat[updatedStat[i].name] = updatedStat[i].score;
          console.log(jsonStat[updatedStat[i].name])
        }
        setData(updatedStat)
        updateStats(jsonStat);
        console.log('json stat');

        console.log(jsonStat);
        console.log('updated stat');

        console.log(updatedStat);

      }
        else{
          console.log("You didnt entered a valid name");
        }
        setClicked(false);
      }
      console.log("finished useEffect Clicked");
  }, [clicked]);
  
  return (
    <View style={{width:"100%"}}>
   <Text style={{ fontSize: 50 ,textAlign: 'center' , fontWeight: 'bold'}}>High Scores</Text>
      {dbLoaded ? null : <Text>loading</Text>}
      <Styles>
        <Table columns={columns} data={data} />
        {/* <Table columns={columns} data={JSON.parse(localStorage.getItem("table"))} /> */}
      </Styles>
      
      <TextInput
        style={styleInput.input}
        onChangeText={onChangeName}
        value={name}
        placeholder={"Insert Name"}
      />
       <Button
        title= {"confrim name"}
        onPress = {() => setClicked(true)}
        />    
      </View>
  );
}


const styleInput = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default HighScores;





