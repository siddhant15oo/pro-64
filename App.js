import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AlertBox,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

// or any pure javascript modules available in npm

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
     text:'',
     isSearchPressed:false,
     isLoading:false,
     word:'Loading...',
     lexicalCategory:'',
     definition:'',

    };
  }

  pressGoButton=(word)=>{
   var searchWord=word.toLowerCase()
   var url='https://rupinwhitehatjr.github.io/dictionary/'+searchWord+'.json'
   return fetch(url)
   .then((answer)=>{
     var responseObject=answer
     if(responseObject){
       var wordData=responseObject.definitions[0]
       var definition=wordData.description
       var lexicalCategory=wordData.wordType
       this.setState({
         'word':this.state.text,
         'definition':definition,
         'lexicalCategory':lexicalCategory

       })
     }
     else{
       this.setState({
         'word':this.state.text,
         'definition':'not found',
         'lexicalCategory':'not found'

       })
     }
   })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Monkey Chunky',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text: text ,
            
            
            isSearchPressed:false,
            
            word:'Loading...',
            
            lexicalCategory:'',
            
            definition:''});
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            //whitehat-dictionary.glitch.me/?word="<TextInputWord>"
            this.pressGoButton(this.state.text)

            this.setState({
              isSearchPressed:true
            })
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <Text>
          this.state.isSearchPressed && this.state.word==='Loading...'?this.state.word:''
        </Text>
        {{this.state.word}!=='Loading...'?
        (<View><Text>Word:{''}</Text></View>
        <View><Text>{this.state.word}</Text></View>
        
        {this.state.wordType!==''?
        (<View><Text>Word:{''}</Text></View>
        <View><Text>{this.state.wordType}</Text></View>)

        {this.state.definition!==''?
        (<View><Text>Word:{''}</Text></View>
        <View><Text>{this.state.definition}</Text></View>)

        ):null
        
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
