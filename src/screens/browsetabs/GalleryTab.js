import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types';
import Masonry from 'react-native-masonry-layout';

class GalleryTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    this.refs.masonry.addItems([
      { key:'1', text:"text1" },
      { key:'2', text:"text2" },
      { key:'3', text:"text3" }
    ]);
  }
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
