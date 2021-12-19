import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import _ from 'lodash';
import { QuestionOutlineIcon, Text } from 'native-base';

const NoData = () => {
    return (
        <View style={styles.container}>
            <QuestionOutlineIcon 
                color='white'
                size='10'
            />
            <Text style={styles.title} numberOfLines={2}>Oops, something went wrong. Please try again later...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.5
    },
    title: {
        lineHeight: moderateVerticalScale(14),
        fontSize: moderateVerticalScale(14),
        color: 'white',
        textAlign: 'center',
        marginTop: moderateVerticalScale(25),
        width: '80%'
    },
});

export default NoData;
