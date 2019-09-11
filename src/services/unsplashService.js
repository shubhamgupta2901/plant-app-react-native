import Unsplash, { toJson } from 'unsplash-js/native';

const config = {
    UNSPLASH_APPLICATION_ID: '472cac9117b005dce9808153cbf00fbac1a844ba720438b8c7bc7b2cce26a6ef',
    UNSPLASH_SECRET: 'e86e3776cc22b52ad65e3f04127dabdb622958b498d1e61cd0ceaa074176ce03',
    PAGE_SIZE: 10,
    SEARCH_QUERY: 'plants',
}
const unsplash = new Unsplash({
    applicationId: config.UNSPLASH_APPLICATION_ID,
    secret: config.UNSPLASH_SECRET,
});
  
export default  {
    listPhotos: unsplash.photos.listPhotos,
    searchPhotos: unsplash.search.photos,
    toJson,
};