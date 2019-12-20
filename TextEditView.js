import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, AsyncStorage, Alert } from 'react-native';
import BetterButton from './BetterButton'

export default class TextEditView extends React.Component {

    constructor (props) {
        super(props)

        this.state = {underline: false, bold: false, italic: false, textField: "TIS HERE IS Ä GREET EDITUUR.\n\nKLIKKA PUTTON TO CONVERT!"}
    };

    setUnderline = () => {
        this.setState({underline: !this.state.underline})
    };

    setBold = () => {
        this.setState({bold: !this.state.bold})
    };

    setItalic = () => {
        this.setState({italic: !this.state.italic})
    };

    _storeData = async () => {
      console.log("save")
      try {
        await AsyncStorage.setItem('SavedText', this.state.textField);
        Alert.alert("TextEdituur", "Text is saved!")
      } catch (error) {
        console.log("Error saving data")
        alert("Failed to save data")
      }
    };

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('SavedText');
        if (value !== null) {
          // We have data!!
          console.log(value);
          this.setState({textField: value})
          Alert.alert("TextEdituur", "Text is loaded!")
        }
      } catch (error) {
        console.log("Error retrieving data")
        alert("Failed to load data")
      }
    };
  
    chosenStyle = () => {
      var userChosenStyles = new Array
  
      if (this.state.underline) {
        userChosenStyles.push(styles.underlinetext)
      }
  
      if (this.state.bold) {
        userChosenStyles.push(styles.boldtext)
      } else {
        userChosenStyles.push(styles.noboldtext)
      }
  
      if (this.state.italic) {
        userChosenStyles.push(styles.italictext)
      } else {
        userChosenStyles.push(styles.noitalictext)
      }
  
      return userChosenStyles
    };

    render() {
      return (
          <View style={styles.container}>
            <View style={styles.text_container}>
              <TextInput style={this.chosenStyle()} multiline={true} selectTextOnFocus={true} onChangeText={(text) => {this.setState({textField: text})}}>{this.state.textField}</TextInput>
            </View>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <BetterButton title="U" onPress={this.setUnderline}/>
              </View>
              <View style={styles.button}>
                <BetterButton title="B" onPress={this.setBold}/>
              </View>
              <View style={styles.button}>
                <BetterButton title="I" onPress={this.setItalic}/>
              </View>
              <View style={styles.button}>
                <BetterButton title="SAVE" onPress={this._storeData}/>
              </View>
              <View style={styles.buttonlast}>
                <BetterButton title="LOAD" onPress={this._retrieveData}/>
              </View>
            </View>
          </View>
      )
  };
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#555',
      height: "100%"
    },

    text_container: {
      marginTop: "7%",
      marginHorizontal: "3%",
      height: "85%",
      backgroundColor: "#fd3",
      paddingHorizontal: 5
    },

    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'space-around',
      position: "absolute",
      marginHorizontal: "3%",
      bottom: 15
    },

    button: {
      paddingRight: "5%",
    },

    buttonlast: {

    },
    
    boldtext: {
      fontWeight: "bold",
    },

    noboldtext: {
      fontWeight: "normal",
    },
  
    italictext: {
      fontStyle: "italic",
    },

    noitalictext: {
      fontStyle: "normal",
    },
  
    underlinetext: {
      textDecorationLine: "underline",
    },
  });