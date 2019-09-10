import React from 'react';
import {Dimensions,StyleSheet,Image,View, Text} from 'react-native'
import PropTypes from 'prop-types';
import Masonry from 'react-native-masonry-layout';
import {unsplashService} from '../../services';
import {theme} from '../../constants';

const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;

class GalleryTab extends React.Component {
  constructor( props ) {
		super( props );
		this.state = {
			withHeight: true,
			loading: false
		};
	}

  componentDidMount = async () => {
		await this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });
    unsplashService.searchPhotos("small garden",1,30)
      .then(unsplashService.toJson)
      .then((data) => {
        this.setState({ loading: false });
        data = data.results.map( item => {
            return {
                image: item.urls.thumb,
                placeholderColor: item.color,
                text: item.description || item.alt_description || "",
                key: item.id,
                height: columnWidth / item.width * item.height
            }
        } );
        if ( this.state.withHeight ) {
            this.refs.list.addItemsWithHeight( data );
        } else {
            this.refs.list.addItems( data );
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
};

onScrollEnd( event ) {
  // const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
  // const height = Math.floor( event.nativeEvent.contentSize.height );
  // if ( scrollHeight >= height ) {
  // 	this.load();
  // }
}

render() {
  return (
          <View style={{ flex: 1, backgroundColor: theme.colors.gallery_background }}>
              <Masonry 
                  onMomentumScrollEnd={this.onScrollEnd.bind( this )}
                  style={{ flex: 1, borderWidth: 1, borderColor: "transparent" }}
                  columns={2} 
                  ref="list"
                  containerStyle={{ padding: 5 }}
                  renderItem={item => <View
                      style={{
                          margin: 5,
                          backgroundColor: item.color || theme.colors.white,
                          borderRadius: 5,
                          overflow: "hidden",
                          borderWidth: 1,
                          borderColor: "#dedede"
                      }}>
                      <Image source={{ uri: item.image }} style={{ height: item.height }}/>
                  </View>}
              />
              {this.state.loading && 
                  <View style={{
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "rgba(0,0,0,0.3)"
                  }}>
                      <Text 
                          style={{
                              backgroundColor: "#fff",
                              paddingVertical: 20,
                              paddingHorizontal: 30,
                              borderRadius: 10}}
                      >
                          Loading
                      </Text>
                  </View>
              }
      </View>
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
