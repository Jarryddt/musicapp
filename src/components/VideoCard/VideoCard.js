import React, { useRef }  from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { moderateVerticalScale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import { 
    Text,
    Image,
    ChevronRightIcon
} from 'native-base';
import PropTypes from 'prop-types';
import { config } from '../../config';

const VideoCard = (props) => {
    const {
        data,
        onCardPress,
    } = props;

    const imageUrl = _.get(data, ['image_url'], '');
    const videoGenre = _.get(data, ['genre_name'], '');
    const cardRef = useRef(null);

    const onCardPressHandler = async () => {
        try {
            if (!_.isEmpty(cardRef.current)) {
                await cardRef.current.pulse(500);
            }
            if (_.isFunction(onCardPress)) {
                await onCardPress();
            }
        } catch (e) {
            console.log(e)
        }
    };
    
    return (
        <TouchableWithoutFeedback onPress={onCardPressHandler}>
            <Animatable.View ref={cardRef} animation="zoomIn" style={styles.container}>
                <Image
                    source={{
                        uri: imageUrl,
                    }}
                    alt='Music Video Image'
                    size='md'
                    borderRadius={10}
                    borderWidth={2}
                    borderColor='#060024'
                    marginRight={5}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.titleText} isTruncated={true}>{_.get(data, ['title'], '')}</Text>
                    <Text style={styles.bodyText} isTruncated={true}>{_.get(data, ['artist'], '')}</Text>
                    <Text style={styles.bodyText} isTruncated={true}>{_.get(data, ['release_year'], '')}</Text>
                    { videoGenre !== '' &&
                        <Text style={styles.bodyText} isTruncated={true}>{_.get(data, ['genre_name'], '')}</Text>
                    }
                </View>
                <View style={styles.proceedIconContainer}>
                    <ChevronRightIcon 
                        size='4' 
                        color='#07f280' 
                        style={styles.proceedIcon}
                    />
                </View>
            </Animatable.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: moderateVerticalScale(20),
    },
    textContainer: {
        flexDirection: 'column',
    },
    titleText: {
        color: '#fff',
        fontWeight: 'bold',
        width: moderateVerticalScale(175)
    },
    bodyText: {
        color: config?.textColour,
        fontSize: moderateVerticalScale(12),
        lineHeight: moderateVerticalScale(16),
        width: moderateVerticalScale(175)
    },
    containerImportant: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: moderateVerticalScale(20),
        marginLeft: moderateVerticalScale(5),
    },
    proceedIconContainer: {
        marginTop: moderateVerticalScale(20),
        position: 'absolute',
        right: 0
    },
    proceedIcon: {
        fontSize: moderateVerticalScale(20),
        marginLeft: moderateVerticalScale(5),
    },
    input: {
        fontSize: moderateVerticalScale(14),
        paddingLeft: moderateVerticalScale(10),
    },
});

VideoCard.propTypes = {
    data: PropTypes.object.isRequired,
    onCardPress: PropTypes.func.isRequired,
};

export default VideoCard;
