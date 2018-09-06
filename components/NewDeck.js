import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { gray, white, blue } from '../utils/colors'
import { submitDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

class NewDeck extends Component {
  state = {
    input: ''
  }
  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }
  submit = () => {
    const title = this.state.input
    const deck = {
      [title]: { title: title, questions: [] }
    }
    if (!title.trim()) {
      alert("Deck title can't be empty")
      return
    }
    this.props.dispatch(addDeck(title))
    submitDeck(deck)
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'DeckList'
      })
    )
    this.props.navigation.navigate('DeckView', { deckName: title })
    this.setState(() => ({
      input: ''
    }))
  }
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 40, paddingTop: 50, paddingBottom: 50 }}>
          What is the title of your new deck?
        </Text>
        <TextInput
          value=""
          style={styles.input}
          placeholder="New deck name"
          onChangeText={this.handleTextChange}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: 10,
    margin: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
export default connect()(NewDeck)
