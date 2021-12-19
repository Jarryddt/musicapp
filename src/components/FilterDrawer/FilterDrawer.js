import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import _ from 'lodash';
import { Text, CloseIcon, Button } from 'native-base';
import SelectBox from 'react-native-multi-selectbox'
import PropTypes from 'prop-types';
import { config } from '../../config';

const FilterDrawer = (props) => {
    const {
        onFilter,
        onClearFilter,
        onCancel,
        genreData
    } = props;

    const [selectedGenres, setSelectedGenres] = useState([]);

    const onConfirmFilterHandler = async () => {
        try {
            if(!_.isEmpty(selectedGenres)){
                await onFilter(selectedGenres);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onMultiSelectHandler = (genre) => {
        try {
            let updateList = [...selectedGenres];
            const genreID =_.get(genre, ['id'], '');
            const find = _.findIndex(updateList, ['id', genreID]);

            if(find > -1 && _.isArray(updateList)){
                updateList.splice(find, 1);
                setSelectedGenres(updateList);
            } else {
                updateList.push(genre);
                setSelectedGenres(updateList);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onMultiSelectCloseHandler = (genre) => {
        try {
            let updateList = [...selectedGenres];
            const genreID =_.get(genre, ['id'], '');
            const find = _.findIndex(updateList, ['id', genreID]);
            if(find > -1 && _.isArray(updateList)){
                updateList.splice(find, 1);
                setSelectedGenres(updateList);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // disble filter until selections are made
    const filterDisabled = _.isEmpty(selectedGenres);
    return (
        <View style={styles.container}>
            <Text style={styles.drawerHeader}>Narrow your search...</Text>
            <TouchableOpacity 
                onPress={onCancel}
                style={styles.closeIcon}
            >
                <CloseIcon
                    size='3' 
                    color='#fff' 
                />
            </TouchableOpacity>
            { _.isArray(genreData) && !_.isEmpty(genreData) &&
                <SelectBox
                    label='Select your genres:'
                    inputPlaceholder=''
                    options={genreData.map((genre)=>{ return({ id: genre.id, item: genre.name})})}
                    selectedValues={selectedGenres.map((genre)=>{ return({ id: genre.id, item: genre.name})})}
                    onMultiSelect={(genre)=> {onMultiSelectHandler(genre)}}
                    onTapClose={(genre)=>{onMultiSelectCloseHandler(genre)}}
                    isMulti
                    searchIconColor='white'
                    arrowIconColor='white'
                    toggleIconColor='#4e8ad1'
                    multiOptionContainerStyle={{backgroundColor: '#4e8ad1', ...styles.multiSelectText}}
                    optionsLabelStyle={styles.multiSelectText}
                    inputFilterStyle={styles.multiSelectText}
                    listEmptyTex={styles.multiSelectText}
                    labelStyle={styles.multiSelectText}
                    listEmptyLabelStyle={styles.multiSelectText}
                    multiListEmptyLabelStyle={styles.multiSelectText}
                    multiOptionsLabelStyle={styles.multiSelectText}
                />
            }
            <Button
                onPress={onConfirmFilterHandler} 
                style={styles.filterButton}
                isDisabled={filterDisabled}
            >
                Continue
            </Button>
            <Button
                onPress={async ()=> {
                    await onClearFilter();
                    setSelectedGenres([]);
                }} 
                style={[styles.filterButton, {backgroundColor: '#ad3030'}]}
            >
                Clear Filter
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: config?.backgroundColour,
        flex: 1,
        height: '100%',
        padding: moderateVerticalScale(20),
    },
    drawerHeader: {
        color: 'white',
        width: '66%',
        letterSpacing: 1.1,
        lineHeight: moderateVerticalScale(14),
        fontSize: moderateVerticalScale(14),
        fontWeight: 'bold',
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(10),
    },
    bodyText: {
        color: config?.textColour,
        fontSize: moderateVerticalScale(12),
    },
    closeIcon: {
        position: 'absolute',
        right: moderateVerticalScale(20),
        top: moderateVerticalScale(45),
    },
    filterButton: {
        marginTop: moderateVerticalScale(20),
        backgroundColor: config?.primaryButtonColour
    },
    multiSelectText: {
        fontSize: moderateVerticalScale(12),
        color: 'white'
    }
});

FilterDrawer.propTypes = {
    onFilter: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    genreData: PropTypes.array.isRequired,
};

export default FilterDrawer;
