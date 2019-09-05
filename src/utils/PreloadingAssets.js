/**
 * For better user experience, certain assets are required to downloaded and cached even before the app starts.
 * Expo's AppLoading api allows us to do perform certain async operations before the app begins.
 * We leverage the same api to download the assets and cache them.
 */

import {Font} from 'expo';
import {Asset} from 'expo-asset';
import {Image} from 'react-native';
/**
 * NOTE: Should the image locations be relative to this file or App.js where we are performing these operations? 
 * Here I was writing thier locations relative to App.js, because it will call the cacheImages and cacheFonts functions and should ideally provide the images. 
 * I was using default argument behavior of functions to provide  them myself, on App.js's behalf.  
 * 
 * However, that's now how it works. It seems that the address of assets should be relative to this file.
 * TODO: Got to understand how this works. 
 * Initial Impression: Will certainly behave differently depending on where i am passing require('location') or simply 'location' as a string in the array
 * because a require('location') will return a specific resource to caller, which is present in asset. 
 * while a simple location is a string , which the caller will use to load a resource at that class.
 * */
  const requiredImagesForCaching = [
    require('../../assets/splash.png'),
    // require('./assets/icon.png'),
    
    // require('../../assets/images/icon.png'),
    // require('../../assets/images/avatar.png'),
    require('../../assets/images/plants_1.png'),
    require('../../assets/images/plants_2.png'),
    require('../../assets/images/plants_3.png'),
    // require('../../assets/images/explore_1.png'),
    // require('../../assets/images/explore_2.png'),
    // require('../../assets/images/explore_3.png'),
    // require('../../assets/images/explore_4.png'),
    // require('../../assets/images/explore_5.png'),
    // require('../../assets/images/explore_6.png'),

    // require('../../assets/icons/back.png'),
    // require('../../assets/icons/fertilizers.png'),
    // require('../../assets/icons/flowers.png'),
    // require('../../assets/icons/plants_1.png'),
    // require('../../assets/icons/plants.png'),
    // require('../../assets/icons/pots.png'),
    // require('../../assets/icons/seeds.png'),
    // require('../../assets/icons/sprayers.png'),
    // require('../../assets/icons/slider-dot.png'),

];

const requiredFontsForCaching = [

] 

export const cacheImages =  (images = requiredImagesForCaching) => {
    return images.map(image => {
      if(typeof image === 'string'){
        return Image.prefetch(image);
      }
      else{
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  
export const cacheFonts = (fonts = requiredFontsForCaching) => {
    return fonts.map(font => Font.loadAsync(font));
}


