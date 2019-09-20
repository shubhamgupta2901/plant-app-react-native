import React from 'react';
import {Platform,Dimensions,StyleSheet,Image,View} from 'react-native'
import PropTypes from 'prop-types';
import {unsplashService} from '../../services';
import {theme} from '../../constants';
import {Masonry, Block,DotIndicator} from '../../elements';



const { width } = Dimensions.get( "window" );
const columnWidth = ( width - 10 ) / 2 - 10;
const PAGE_SIZE= 20;
const SEARCH_QUERY= 'plants';

class GalleryTab extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      withHeight: true,
      loading: false,
      data: [],
      page: 1,
      totalResponses: 0,
    };
  }

  componentDidMount = async () => {
      await this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });
    unsplashService.searchPhotos(SEARCH_QUERY,this.state.page,PAGE_SIZE)
      .then(unsplashService.toJson)
      .then((responseData) => { 
        incomingData = responseData.results.map( item => {
            return {
                image: item.urls.thumb,
                placeholderColor: item.color,
                text: item.description || item.alt_description || "",
                key: item.id,
                height: columnWidth / item.width * item.height
            }
        } );
        data = this.state.data;
        data.length === 0 ? data = incomingData : data = [...data, ...incomingData];
        this.setState(prevState => ({
            loading: false,
            page: prevState.page+1,
            data: data,
            totalResponses: responseData.total_pages,
        }))
        
        if ( this.state.withHeight ) {
            this.refs.list.addItemsWithHeight(incomingData );
        } else {
            this.refs.list.addItems( incomingData );
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
    };

  onScrollEnd = async ( event ) =>{
  //Callback when scroller reaches end of Masonry View 
  //TODO: if all the results are shown, don't do anything

    const scrollHeight = Math.floor( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height );
    const height = Math.floor( event.nativeEvent.contentSize.height );
    if ( scrollHeight >= height ) {
      if(this.state.data.length < this.state.totalResponses)
        await this.makeRemoteRequest();
    }
  }

  renderProgressIndicator = () => {
    if(!this.state.loading)
      return null;
    return (
        <View style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.3)"
          }}
        >
            <DotIndicator color = {theme.colors.white} count = {4} size = {theme.sizes.base*0.5}/>
        </View>
    )
  }

  renderMasonryItem = (item) => {
    return (
      <View
        style={{
          margin: 5,
          backgroundColor: item.color,
          borderRadius: 5,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#dedede"
        }}
      >   
        <Image source={{ uri: item.image }}  style={{ height: item.height }}/>
      </View>
    )
  }

  

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.gallery_background }}> 
              <Masonry 
                  onMomentumScrollEnd={this.onScrollEnd.bind( this )}
                  style={{ flex: 1, borderWidth: 1, borderColor: "transparent", marginBottom: Platform.OS === 'ios' ? theme.sizes.base : 0 }}
                  columns={2} 
                  ref="list"
                  containerStyle={{ padding: 5 }}
                  renderItem={item => this.renderMasonryItem(item)}
              />
              {this.renderProgressIndicator()}
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
