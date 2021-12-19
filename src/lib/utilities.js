import axios from 'axios';
import _ from 'lodash';
import { config } from '../config';

const updateVideos = (videos, genres) => {
    try {
        if(_.isArray(videos) && !_.isEmpty(videos)){
            const result = videos.map(item => {
                const videoGenreID = _.get(item, ['genre_id'], '');
                if(videoGenreID !== '' && !_.isEmpty(genres)) {
                    const videoGenre = _.find(genres, ['id', videoGenreID]);
                    const videoGenreName = _.get(videoGenre, ['name'], '');
                    return {...item, genre_name: videoGenreName}
                }
            });
            return result;
        } else {
            // required data not present, return empty array.
            return [];
        }
    } catch (e) {
        return;
    }
};

export const fetchPageData = async () => {
    try {
        const apiUrl = _.get(config, ['apiUrl'], '');
        const response = await axios.get(apiUrl);
        const status = _.get(response, ['status'], 500);
        const data = _.get(response, ['data'], {});
        if(status === 200) {
            const genres = _.get(data, ['genres'], []);
            const videos = _.get(data, ['videos'], []);
            const updatedVideos = updateVideos(videos, genres);
            const result = {
                genres,
                videos: updatedVideos,
                status: 'success'
            };
            return result;
        } else {
            // api call failed, carry on with the process.
            return;
        }
    } catch (e) {
        return;
    }
};

export const filterVideosByGenre = (videos, genres) => {
    try {
        if(!_.isEmpty(videos) && !_.isEmpty(genres)) {
            const filteredVideos = videos.filter(video => 
                genres.some(genre => video.genre_id === genre.id));
            const result = {
                videos: [...filteredVideos],
                status: 'success'
            };
            return result;
        } else {
            // required data not present, return.
            return;
        }
    } catch (e) {
        return;
    }
};
