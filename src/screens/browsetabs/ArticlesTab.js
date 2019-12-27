import React from 'react';
import {StyleSheet,View, Text} from 'react-native'
import PropTypes from 'prop-types'
import NewsList from './news/NewsList';

class ArticlesTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: 'Articles'
    }
  }

  componentDidMount = () => {
    
  }
   
  render(){
    return (
        <NewsList/>
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

ArticlesTab.propTypes ={
}

ArticlesTab.defaultProps ={
}

export default ArticlesTab;
