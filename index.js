/**
 * @format
 */
import React, { Fragment, Component } from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';

import App from './src/redux/App'
// import Place from './src/redux/ParkingPlaceDetails'

AppRegistry.registerComponent(appName, () => App);
