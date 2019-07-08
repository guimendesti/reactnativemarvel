import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './src/screens/Home'
import Description from './src/screens/Description'

const AppNavigator = createStackNavigator({
        Home: {
            screen: Home
        },
        Description: {
            screen: Description
        },
    },
    {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
    })

export default createAppContainer(AppNavigator);