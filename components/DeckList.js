import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { loadInitial } from '../actions'
import { AppLoading } from 'expo'
import { fetchDecks } from '../utils/api'
import { gray, white } from '../utils/colors'
import { DeckView } from './DeckView'

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    fetchDecks()
      .then((results) => dispatch(loadInitial(results)))
      .then(() => this.setState(() => ({ ready: true })))
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('DeckView', { deckName: item.title })
        }
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text style={{ color: gray }}>{item.questions.length} cards</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <FlatList
        data={Object.values(decks)}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList)
