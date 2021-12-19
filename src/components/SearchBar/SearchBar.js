import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, HamburgerIcon, SearchIcon } from 'native-base';
import { moderateVerticalScale } from 'react-native-size-matters';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { config } from '../../config';

const SearchBar = props => {
    const {
        onShowDrawer,
        onTextChange,
    } = props;
    
    const inputRef = useRef(null);

    return (
        <View style={[styles.container, styles.containerImportant]}>
            <Input
                variant='underlined'
                placeholder='Search your favourite videos...'
                placeholderTextColor={config?.textColour}
                style={styles.input}
                onChangeText={onTextChange}
                ref={inputRef}
                InputLeftElement={
                    <SearchIcon size='4' color='#07f280' />
                }
            />
            <TouchableOpacity 
                onPress={onShowDrawer} 
                style={styles.filterIcon}
            >
                <HamburgerIcon 
                    size='4' 
                    color='#07f280' 
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: moderateVerticalScale(5),
        alignItems: 'center',
        height: moderateVerticalScale(40),
        marginTop: moderateVerticalScale(15),
        marginBottom: moderateVerticalScale(15),
    },
    containerImportant: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: moderateVerticalScale(20),
        marginLeft: moderateVerticalScale(5),
    },
    input: {
        fontSize: moderateVerticalScale(14),
        paddingLeft: moderateVerticalScale(10),
        color: '#fff'
    },
    filterIcon: {
        position: 'absolute',
        right: moderateVerticalScale(10),
    }
});

SearchBar.propTypes = {
    onShowDrawer: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
};

export default SearchBar;
