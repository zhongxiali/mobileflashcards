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
import { addCard } from '../actions'
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
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: `New Card -> ${deckName}`
    }
  }
  state = {
    question: '',
    answer: ''
  }
  handleTextChangeQuestion = (question) => {
    this.setState(() => ({
      question
    }))
  }
  handleTextChangeAnswer = (answer) => {
    this.setState(() => ({
      answer
    }))
  }
  submit = () => {
    const { question, answer } = this.state
    const { deckName, deck } = this.props
    const card = {
      question: question,
      answer: answer
    }
    if (!question.trim() || !answer.trim()) {
      alert('Question&Answer can not be empty')
      return
    }
    const updatedDeck = {
      [deckName]: { ...deck, questions: deck.questions.concat(card) }
    }
    this.props.dispatch(addCard(card, deckName))
    submitDeck(updatedDeck)
    this.props.navigation.goBack()
  }
  render() {
    const { question, answer } = this.state
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, paddingTop: 50, paddingBottom: 30 }}>
          New Card:
        </Text>
        <TextInput
          value={question}
          style={styles.input}
          placeholder="--Question--"
          onChangeText={this.handleTextChangeQuestion}
        />
        <TextInput
          value={answer}
          style={styles.input}
          placeholder="--Answer--"
          onChangeText={this.handleTextChangeAnswer}
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
    margin: 10,
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

function mapStateToProps(decks, { navigation }) {
  const { deckName } = navigation.state.params
  return {
    deckName,
    deck: decks[deckName]
  }
}
export default connect(mapStateToProps)(NewCard)
