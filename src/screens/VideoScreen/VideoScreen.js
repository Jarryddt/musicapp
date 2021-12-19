import React from 'react';
import {
    Dimensions,
    Text,
    StyleSheet
} from 'react-native';
import _ from 'lodash';
import { 
    Heading, 
    Image
} from 'native-base';
import { moderateVerticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { config } from '../../config';

const { height, width } = Dimensions.get('screen');

const VideoScreen = (props) => {

    const selectedVideo = _.get(props, ['route', 'params', 'info'], {});
    const videoTitle = _.get(selectedVideo, ['title'], '');
    const videoArtist = _.get(selectedVideo, ['artist'], '');
    const videoYear = _.get(selectedVideo, ['release_year'], '');
    const videoImageUrl = _.get(selectedVideo, ['image_url'], '');  
    const videoGenre = _.get(selectedVideo, ['genre_name'], '');

    return (
        <LinearGradient
            colors={[
                "#052233",
                "#040d29"
            ]}
            useAngle={true}
            angle={120}
            angleCenter={{ x: 0.5, y: 0.5 }}
            style={styles.container}
        >
            <Image
                source={{
                    uri: videoImageUrl,
                }}
                alt='Music Video Image'
                borderRadius={10}
                borderWidth={2}
                borderColor='#060024'
                marginRight={5}
                width={width * 0.9}
                height={height * 0.6}
            />
            <Heading style={styles.headingText}>{videoTitle}</Heading>
            <Text style={styles.bodyText}>{videoArtist}</Text>
            <Text style={styles.bodyText}>{videoYear}</Text>
            { videoGenre !== '' &&
                <Text style={styles.bodyText}>{videoGenre}</Text>
            }
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height, 
        justifyContent:'center',
        backgroundColor: config?.backgroundColour,
        paddingHorizontal: moderateVerticalScale(25)
    },
    spinner: {
        marginVertical: moderateVerticalScale(50),
    },
    headingText: {
        color: '#07f280',
        letterSpacing: 1.2,
        lineHeight: moderateVerticalScale(20),
        fontSize: moderateVerticalScale(20),
        fontWeight: 'bold',
        marginTop: moderateVerticalScale(20),
        marginBottom: moderateVerticalScale(10),
    },
    bodyText: {
        color: config?.textColour,
        fontSize: moderateVerticalScale(14),
        marginTop: moderateVerticalScale(5),
    },
    listContainer: {
        marginTop: '2.5rem'
    },
});

export default VideoScreen;