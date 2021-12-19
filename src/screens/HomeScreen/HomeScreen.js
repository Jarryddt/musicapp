import React, { useEffect, useCallback, useState } from 'react';
import {
    Dimensions,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import _ from 'lodash';
import { 
    Heading, 
    Spinner
} from 'native-base';
import FuzzySearch from 'fuzzy-search';
import MenuDrawer from 'react-native-side-drawer'
import { moderateVerticalScale } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';

import { fetchPageData, filterVideosByGenre } from '../../lib/utilities';
import SearchBar from '../../components/SearchBar/SearchBar';
import VideoCard from '../../components/VideoCard/VideoCard';
import FilterDrawer from '../../components/FilterDrawer/FilterDrawer';
import NoData from '../../components/NoData/NoData';
import { config } from '../../config';

const { height } = Dimensions.get('screen');

const HomeScreen = (props) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [videoData, setVideoData] = useState([]);
    const [genreData, setGenreData] = useState([]);
    const [filteredData, setFilteredData] = useState([...videoData]);
    const [searcher, setSearcher] = useState(null);
    const defaultFeedback = _.get(config, ['defaultFeedback'], {});

    const onNavigateHandler = (info) => {
        try {
            if(!_.isEmpty(info)){
                navigation?.navigate('Video', {info});
            }
        } catch (e) {
            showMessage(defaultFeedback);
        }
    };

    const onSearchTextChangeHandler = (text) => {
        try {
            if (!_.isEmpty(searcher)) {
                setFilteredData(searcher.search(text));
            }
        } catch (e) {
            setFilteredData(videoData);
        }
    };

    const onFilterConfirmHandler = (data) => {
        try {
            setLoading(true);
            setShowDrawer(false);
            if(!_.isEmpty(data) && !_.isEmpty(videoData)){
                const result = filterVideosByGenre(videoData, data);
                const status = _.get(result, ['status'], 'fail');
                if(status === 'success') {
                    const videos =_.get(result, ['videos'], []);
                    setFilteredData(videos);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }
        } catch (e) {
            setLoading(false);
            showMessage(defaultFeedback);
        }
    };

    const onFilterClearHandler = async () => {
        try {
            setLoading(true);
            setShowDrawer(false);
            const result = await fetchPageData();
            const status = _.get(result, ['status'], 'fail');
            if(status === 'success') {
                const genres =_.get(result, ['genres'], []);
                const videos =_.get(result, ['videos'], []);
                setVideoData(videos);
                setGenreData(genres);
            }
            setLoading(false);
        } catch (e) {
            setLoading(true);
            showMessage(defaultFeedback);
        }
    };

    const onFetchDataHandler = useCallback(async () => {
        try {
            setLoading(true);
            const result = await fetchPageData();
            const status = _.get(result, ['status'], 'fail');
            if(status === 'success') {
                const genres =_.get(result, ['genres'], []);
                const videos =_.get(result, ['videos'], []);
                setVideoData(videos);
                setGenreData(genres);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        onFetchDataHandler();
    }, [onFetchDataHandler]);

    useEffect(() => {
        const newSearcher = new FuzzySearch(
            videoData,
            ['title', 'artist', 'release_year'],
            {
                caseSensitive: false,
            },
        );
        setSearcher(newSearcher);
        setFilteredData(videoData);
    }, [videoData]);

    return (
        <MenuDrawer 
            open={showDrawer} 
            drawerContent={
                <FilterDrawer 
                    onFilter={onFilterConfirmHandler}
                    onClearFilter={onFilterClearHandler}
                    genreData={genreData}
                    onCancel={()=> {
                        setShowDrawer(!showDrawer);
                    }}
                />
            }
            drawerPercentage={60}
            animationTime={250}
            overlay={true}
            opacity={0.6}
            position='right'
        >
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
                <Heading style={styles.headingText}>Hi, {_.get(config, ['defaultUser'], 'User')}</Heading>
                <Text style={styles.bodyText}>What would you like to watch today?</Text>
                <SearchBar 
                    onTextChange={onSearchTextChangeHandler}
                    onShowDrawer={()=> {
                        setShowDrawer(true);
                    }}
                />
                { loading &&
                    <Spinner 
                        color={_.get(config, ['successButtonColour'], '#fff')} 
                        style={styles.spinner}
                    />
                }
                { _.isArray(videoData) && !_.isEmpty(videoData) && !loading &&
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <VideoCard
                                onCardPress={onNavigateHandler.bind(this, item)}
                                data={item}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                } 
                { _.isEmpty(videoData) && !loading &&
                    <NoData />
                }
            </LinearGradient>
        </MenuDrawer>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height, 
        backgroundColor: config?.backgroundColour,
        paddingTop: moderateVerticalScale(40),
        paddingHorizontal: moderateVerticalScale(25),
    },
    spinner: {
        marginVertical: moderateVerticalScale(50),
    },
    headingText: {
        color: 'white',
        letterSpacing: 1.2,
        lineHeight: moderateVerticalScale(20),
        fontSize: moderateVerticalScale(20),
        fontWeight: 'bold',
        marginBottom: moderateVerticalScale(10),
    },
    bodyText: {
        color: config?.textColour,
        fontSize: moderateVerticalScale(12),
    },
    listContainer: {
        marginTop: '2.5rem'
    },
});

export default HomeScreen;