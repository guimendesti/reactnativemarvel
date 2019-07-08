/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

/* eslint-disable */
jest.mock('react-navigation-stack', () => {});
jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest.fn().mockReturnValue(function NavigationContainer(props) {return null;}),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest.fn().mockImplementation(x => ({...x,  "type": "Navigation/PUSH"})),
      replace: jest.fn().mockImplementation(x => ({...x,  "type": "Navigation/REPLACE"})),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation(x => x),
    }
  }
});
/* eslint-enable */

it('renders correctly', () => {
  // renderer.create(<App />);
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
