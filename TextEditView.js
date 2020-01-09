import React from 'react';
import { StyleSheet, View, TextInput, AsyncStorage, Alert } from 'react-native';
//import { createStackNavigator } from 'react-navigation-stack';
import BetterButton from './BetterButton'

export default class TextEditView extends React.Component {

  constructor (props) {
      super(props)

      this.state = {underline: false, bold: false, italic: false, textField: "TIS HERE IS Ä GREET EDITUUR.\n\nKLIKKA PUTTON TO CONVERT!"}
  };

  static navigationOptions = {
    title: 'Editor'
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT")
    this.props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    console.log("LOOOOOOOOOOOOOOAAAAAAAAAAAAAADDDDDDDD")
    if (this.props.navigation.getParam('textEdit') !== undefined) {
      console.log("NOT NULL BOIS")
      console.log(this.props.navigation.getParam('textEdit'))
      this.setState({textField: this.props.navigation.getParam('textEdit')})
    }
  }

  toSave = () => {
    this.props.navigation.navigate('Save', {text: this.state.textField})
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
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
          <View style={styles.text_container} key="textfield">
            <TextInput style={this.chosenStyle()} multiline={true} selectTextOnFocus={true} onChangeText={(text) => {this.setState({textField: text})}}>{this.state.textField}</TextInput>
          </View>
          <View style={styles.buttons} key="buttons">
            <View style={styles.button} key="underline">
              <BetterButton title="U" onPress={this.setUnderline}/>
            </View>
            <View style={styles.button} key="bold">
              <BetterButton title="B" onPress={this.setBold}/>
            </View>
            <View style={styles.button} key="italics">
              <BetterButton title="I" onPress={this.setItalic}/>
            </View>
            <View style={styles.button} key="saveload">
              <BetterButton title="SAVE / LOAD" onPress={this.toSave}/>
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