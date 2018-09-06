import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { Constants } from 'expo'
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { purple, white, blue } from './utils/colors'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import NewCard from './components/NewCard'
import QuizMode from './components/QuizMode'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="cards-outline"
          size={30}
          color={tintColor}
        />
      )
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="library-plus"
          size={30}
          color={tintColor}
        />
      )
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerStyle: {
        backgroundColor: blue
      }
    }
  },
  QuizMode: {
    screen: QuizMode,
    navigationOptions: {
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerStyle: {
        backgroundColor: blue
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={white} barStyle="dark-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
