import React from 'react';
import {Dimensions,StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types';
import Masonry from 'react-native-masonry-layout';
import Unsplash, { toJson } from 'unsplash-js/native';

const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;

const config = {
  unsplashApplicationId: '472cac9117b005dce9808153cbf00fbac1a844ba720438b8c7bc7b2cce26a6ef',
  unsplashSecret: 'e86e3776cc22b52ad65e3f04127dabdb622958b498d1e61cd0ceaa074176ce03',
}
const unsplash = new Unsplash({
  applicationId: config.unsplashApplicationId,
  secret: config.unsplashSecret,
});

const unsplashService =  {
  listPhotos: unsplash.photos.listPhotos,
  searchPhotos: unsplash.search.photos,
  toJson,
};

class GalleryTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      withHeight: true,
			loading: false
    }
  }

  componentDidMount = async ()=>{
    await this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });
    unsplashService.searchPhotos("house plant",1,30)
      .then(unsplashService.toJson)
      .then((data) => {
        this.setState({ loading: false });
         console.log(data);
        
        data = data.results.map( item => {
            return {
                image: item.urls.thumb,
                text: item.description || item.alt_description || "",
                key: item.id,
                height: columnWidth / item.width * item.height
            }
        } );
        if ( this.state.withHeight ) {
            this.refs.masonry.addItemsWithHeight( data );
        } else {
            this.refs.masonry.addItems( data );
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  render(){
    return (
      <Masonry
        ref="masonry"
        columns={3} // optional - Default: 2
        renderItem={(item)=><View>
          <Text>{item.text}</Text>
        </View>}
      />
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

GalleryTab.propTypes ={
}

GalleryTab.defaultProps ={
}

export default GalleryTab;
