import Unsplash, { toJson } from 'unsplash-js/native';
import config from '../../config';

const unsplash = new Unsplash({
    applicationId: config.UNSPLASH_APPLICATION_ID,
    secret: config.UNSPLASH_SECRET,
});
  
export default  {
    listPhotos: unsplash.photos.listPhotos,
    searchPhotos: unsplash.search.photos,
    toJson,
};