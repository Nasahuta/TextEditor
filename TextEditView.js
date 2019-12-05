import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';

export default class TextEditView extends React.Component {

    constructor (props) {
        super(props)

        this.state = {underline: false, bold: false, italic: false, textField: "TIS HERE IS Ä GREET EDITUUR. KLIKKA PUTTON TO CONVERT!"}
    }

    setUnderline = () => {
        this.setState({underline: !this.state.underline})
    };

    setBold = () => {
        this.setState({bold: !this.state.bold})
    };

    setItalic = () => {
        this.setState({italic: !this.state.italic})
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
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={this.chosenStyle()} onChangeText={(text) => {this.setState({textField: text})}}>{this.state.textField}</TextInput>
                <View style={styles.buttons}>
                    <Button title="Underline" onPress={this.setUnderline}/>
                    <Button title="Bold" onPress={this.setBold}/>
                    <Button title="Italic" onPress={this.setItalic}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttons: {
      flexDirection: 'row',
      marginTop: 5,
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