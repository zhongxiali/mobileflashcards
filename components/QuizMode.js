import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { gray, white, blue, red, green } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class QuizMode extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: `Quiz: ${deckName}`
    }
  }
  state = {
    now: 1,
    correct: 0,
    back: false
  }
  handleFlip = () => {
    this.setState(() => ({
      back: !this.state.back
    }))
  }
  handleDone = () => {
    clearLocalNotification().then(() => setLocalNotification())
    this.props.navigation.goBack()
  }
  handleRestart = () => {
    clearLocalNotification().then(() => setLocalNotification())
    this.setState(() => ({
      now: 1,
      correct: 0,
      back: false
    }))
  }
  render() {
    const { deckName, deck } = this.props
    const { now, correct, back } = this.state
    const count = deck.questions.length
    console.log(deck.questions[2])
    return (
      <View>
        <Text style={styles.count}>
          {now <= count ? `${now}/${count}` : ''}
        </Text>
        {now > count ? (
          <View style={styles.center}>
            <TouchableOpacity style={styles.card} onPress={this.handleDone}>
              <Text style={{ fontSize: 30 }}>
                You got {correct} out of {count} questions right!
              </Text>
              <Text style={{ color: red }}>Finished!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.darkBtn, { backgroundColor: red }]}
              onPress={this.handleRestart}
            >
              <Text style={{ color: white }}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.darkBtn, { backgroundColor: gray }]}
              onPress={this.handleDone}
            >
              <Text style={{ color: white }}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.center}>
            <TouchableOpacity style={styles.card} onPress={this.handleFlip}>
              <Text style={{ fontSize: 30 }}>
                {back
                  ? deck.questions[now - 1].answer
                  : deck.questions[now - 1].question}
              </Text>
              <Text style={{ color: red }}>{back ? 'Question' : 'Answer'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.darkBtn, { backgroundColor: green }]}
              onPress={() =>
                this.setState(() => ({
                  back: false,
                  now: now + 1,
                  correct: correct + 1
                }))
              }
            >
              <Text style={{ color: white }}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.darkBtn, { backgroundColor: red }]}
              onPress={() =>
                this.setState(() => ({
                  back: false,
                  now: now + 1
                }))
              }
            >
              <Text style={{ color: white }}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    minHeight: 250,
    width: '90%',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  count: {
    fontWeight: 'bold',
    margin: 5,
    fontSize: 20
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  darkBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
function mapStateToProps(decks, { navigation }) {
  const { deckName } = navigation.state.params
  return {
    deckName,
    deck: decks[deckName]
  }
}
export default connect(mapStateToProps)(QuizMode)
