import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import VideoScreen from '../../screens/VideoScreen/VideoScreen';

const { height, width } = Dimensions.get('screen');

const HomeNavigator = () => {

    const HomeStack = createStackNavigator();

    return (
        <SafeAreaView style={styles.view}>
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <HomeStack.Screen
                    name='Video'
                    component={VideoScreen}
                    options={{
                        title: '',
                        headerBackTitle: 'Back',
                        headerTransparent: true,
                        headerTintColor:'white',
                        headerTitleAlign: 'left'
                    }}
                />
            </HomeStack.Navigator>
            <View style={styles.bottomView} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#CAD3DD'
    },
    bottomView: {
        backgroundColor: '#040d29',
        height: height * 0.05,
        position: 'absolute',
        bottom: 0,
        width,
    },
});

export default HomeNavigator;