import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, black } from '../utils/colors'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params
    return {
      title: `Deck: ${deckName}`
    }
  }

  render() {
    const { deckName, deck } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 40, paddingTop: 30 }}>{deckName}</Text>
        <Text style={{ color: gray, paddingBottom: 40 }}>
          {deck.questions.length} cards
        </Text>
        <TouchableOpacity
          style={styles.lightBtn}
          onPress={() =>
            this.props.navigation.navigate('NewCard', { deckName: deckName })
          }
        >
          <Text style={{ color: black }}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.darkBtn}
          disabled={deck.questions.length === 0}
          onPress={() =>
            this.props.navigation.navigate('QuizMode', { deckName: deckName })
          }
        >
          <Text style={{ color: white }}>
            {deck.questions.length === 0 ? 'No Quiz' : 'Start a Quiz<'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lightBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
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

export default connect(mapStateToProps)(DeckView)
