

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NativeBaseProvider } from 'native-base';
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './src/navigation/HomeNavigator/HomeNavigator';

 const App = () => {

	useEffect(() => {
		// Allow time for UI to bind
        setTimeout(() => {
            RNBootSplash.hide();
        }, 2000);
    }, []);
 
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<HomeNavigator />
			</NavigationContainer>
			<FlashMessage position="top" />
		</NativeBaseProvider>
	);
 };
 
 export default App;
 