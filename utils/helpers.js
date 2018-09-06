import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const DECK_STORAGE_KEY = 'MobilFlashcards:deck'
const NOTIFICATION_KEY = 'MobilFlashcards:notifications'
function initialData() {
  decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  return decks
}

export function checkEmptyDeck(results) {
  // AsyncStorage.removeItem(DECK_STORAGE_KEY)
  console.log(results)
  if (results === null) {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialData()))
  }
  return results === null ? initialData() : JSON.parse(results)
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  )
}

function createNotification() {
  return {
    title: 'Quiz Time!',
    body: "don't forget quiz yourself today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
