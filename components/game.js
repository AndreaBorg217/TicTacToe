/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, Image} from 'react-native';

const Game = () => {
    const keys =[
        {id: 0}, 
        {id: 1}, 
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
    ];

    const wins = [
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6]
    ];
    
    const [turn, setTurn] = useState('X');
    const [contents, setContents] = useState(Array(9). fill(null));
    const [isSet, setSet] = useState(Array(9). fill(false));
    
    const Cell = ({num}) =>{
        return (
            <TouchableOpacity style = {styles.cell} onPress = {() => handleCLick(num)}>
            <Text style = {styles.contents}>{contents[num]}</Text>
            </TouchableOpacity>
        );
    };
  
    const restart = () =>{
        setTurn('X');
        setContents(Array(9). fill(null));
        setSet(Array(9). fill(false));
    }

    const winAction = () => {
        let message = 'Player ' + JSON.stringify(turn) + ' has won!';
        Alert.alert('WINNER!', message);
        restart();
    }

    const checkWinner = (input) =>{
        for (let i = 0; i < wins.length; i++) {
            let first = wins[i][0];
            let second =wins[i][1];
            let third = wins[i][2];
            if(contents[first] === input && contents[second] === input && contents[third] === input){
               return true;
            }
        }
    }
    const handleCLick = (num) => {
        if(isSet[num] === false){
            isSet[num] = true;
            if(turn === 'X'){
                contents[num] = 'X';
                if(checkWinner('X') === true){
                    winAction();
                }
                else{
                    setTurn('O');
                }
            }
            else{
                contents[num] = 'O';
                if(checkWinner('O') === true){
                    winAction();
                }
                else{
                    setTurn('X');
                }
            }
        }
        else{
            Alert.alert(null, 'You cannot modify an already set cell');
        }
    };

 return (
    <View style = {styles.container}> 
    <View styles = {styles.header}><Text style={styles.text}>Player {turn}'s Turn</Text></View>
        <FlatList 
        style = {styles.table}
        data={keys}
        renderItem={({ item }) => <Cell num = {item.id}/>}
        keyExtractor={cell => cell.id}
        numColumns = {3}
      />
      <TouchableOpacity  onPress = {() => restart()}>
      <Image style = {styles.restart} source={require('./undo.png')}/>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#123',
        marginTop: 75,
    },
    header:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    table:{
        width: 300,
        height: 300,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 70,
    },
    cell:{
        borderColor: 'white',
        borderWidth: 2,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contents:{
        color: 'orange',
        fontSize: 40,
        fontWeight: 'bold'
    },
    restart:{
        width: 50,
        height: 50,
        marginBottom: 250
    },
});

export default Game;
