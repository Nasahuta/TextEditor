import React from 'react';
import { StyleSheet, View, TextInput, AsyncStorage, Alert, FlatList, Text } from 'react-native';
import BetterButton from './BetterButton';

export default class TextEditView extends React.Component {

  constructor (props) {
    super(props)

    this.state = {amount: 0, saves: null, saveAsTextfield: ""}
    //this.deleteSave = this.deleteSave.bind(this)
    //loadSaves()
    this.loadSaves()
  };

  static navigationOptions = {
      title: '    Save / Load'
  }

  /*componentDidMount() {
    this.loadSaves()
  }*/

  /////////////////////////
  // LOAD EXISTING SAVES //
  /////////////////////////
  loadSaves = async () => {
    try {
      const myArray = await AsyncStorage.getItem('EditorSaves');
      if (myArray !== null) {
        // We have data!!
        console.log("LOAD EXISTING SAVES" + JSON.parse(myArray))
        //console.log(JSON.parse(myArray));
        this.setState({amount: JSON.parse(myArray).length, saves: JSON.parse(myArray)})
      } else {
        console.log("nullia EditorSavessa")
        this.setState({amount: 0, saves: null})
      }
    } catch (error) {
      // Error retrieving data
      console.log("nottingthere");
    }
  }

  //////////////////////////////
  // RENDER SINGLE SAVED FILE //
  //////////////////////////////
  singleSave = (saveName) => {
    return (<View style={styles.single_save}>
      <Text ref='saveName' style={styles.save_text}>{saveName.saveName}</Text>
      <BetterButton title="Save" onPress={() => this._storeData(saveName.saveName)}/>
      <BetterButton title="Load" onPress={() => this._retrieveData(saveName.saveName)}/>
      <BetterButton style={{backgroundColor: 'red'}} title="DEL" onPress={() => this.deleteSave(saveName.saveName)}/>
      </View>);
  }

  ///////////////////////////
  // RENDER ALL COMPONENTS //
  ///////////////////////////
  saves = () => {

    var allSaves = new Array

    if (this.state.amount !== 0) {

      for (var i = 0; i < this.state.amount; i++) {
        allSaves.push(this.singleSave({saveName: this.state.saves[i], index: i}))
      }
    }
    allSaves.push(this.saveAs())

    return allSaves
  }

  ////////////////////////
  // UPDATE EDITORSAVES //
  ////////////////////////
  updateEditorSaves = async () => {
    try {
      await AsyncStorage.setItem('EditorSaves', JSON.stringify(this.state.saves))
      console.log(this.state.saves)
    } catch(error) {
      console.log("error updating " + error)
    }
  }

  checkSaveName = (saveName) => {
    for (const index in this.state.saves) {
      let saveNames = this.state.saves[index]

      if (saveNames === saveName) {
        return false
      }
    }

    return true
  }
  
  ///////////////
  // SAVE FILE //
  ///////////////
  _storeData = async (saveName) => {
    console.log(saveName)

    if (saveName == "" || saveName == null) {
      Alert.alert("SAVE ERROR", "You have to enter a name for the save.")
      return
    }

    //Alert.alert()
    //this.props.navigation.navigate('Save')
    
    try {
      await AsyncStorage.setItem(saveName, this.props.navigation.getParam('text'));
      if (this.state.amount !== 0) {
        if (this.checkSaveName(saveName)) {
          this.setState({amount: this.state.amount + 1, saves: [...this.state.saves, saveName]}, this.updateEditorSaves);
          //this.updateEditorSaves()
        }
      } else {
        this.setState({amount: 1, saves: [saveName]}, this.updateEditorSaves)
      }

      Alert.alert("TextEdituur", "Text " + saveName + " is saved!")
    } catch (error) {
      console.log("Error saving data " + error)
      alert("Failed to save data")
    }

    //this.setState({saveAsTextfield: null})
  };

  ///////////////
  // LOAD TEXT //
  ///////////////
  _retrieveData = async (saveName) => {

    console.log("load")

    try {
      const value = await AsyncStorage.getItem(saveName);
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({textField: value} , Alert.alert("TextEdituur", "Text is loaded!") , this.props.navigation.navigate('TextEdit', {textEdit: value}))
      }
    } catch (error) {
      console.log("Error retrieving data")
      alert("Failed to load data")
    }
  };

  ////////////////////////////////
  // SAVE WITH NEW TEXTFILENAME //
  ////////////////////////////////
  saveAs = () => {
    return (<View style={styles.single_save}>
      <TextInput style={styles.save_text} onChangeText={(text) => {this.setState({saveAsTextfield: text})}}/>
      <BetterButton title="Save As" onPress={() => this._storeData(this.state.saveAsTextfield)} />
      </View>)
  }

  /////////////////
  // DELETE SAVE //
  /////////////////
  deleteSave = async (saveName) => {
    console.log(saveName)
    console.log(this.state.amount)

    if (this.state.amount !== 0) {
      try {
        await AsyncStorage.removeItem(saveName)
        this.setState({amount: this.state.amount - 1, saves: this.state.saves.filter((save) => saveName !== save)}, this.updateEditorSaves)
      } catch (error) {

      }
    }
    //this.setState({amount: 0, saves: null})
    //this.loadSaves()
    //this.updateEditorSaves()
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.saves()}
      </View>
    )
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#555',
      height: "100%"
    },

    single_save: {
      flexDirection: 'row',
      marginTop: 10,
      marginHorizontal: 5,
      paddingHorizontal: 5,
    },

    save_text: {
      paddingHorizontal: 10,
      backgroundColor: '#FFF',
      width: '60%',
      textAlign: "center",
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