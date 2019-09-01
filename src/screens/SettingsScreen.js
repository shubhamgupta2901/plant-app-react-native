import React from 'react';
import {StyleSheet,ScrollView, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Block, Text, Button} from '../elements';
import {theme,mocks} from '../constants';


class SettingsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  renderHeader = () => {
    return (
      <Block flex = {false} center row space="between" style = {styles.header}>
        <Text h1 bold>Settings</Text>
        <Button>
          <Image
            source = {mocks.profile.avatar}
            style ={styles.avatar}
          />
        </Button>
      </Block>
    )
  }

  render(){
    return (
        <Block>
            {this.renderHeader()}
        </Block>
    );
  }
}

const styles = StyleSheet.create({
    header:{
      paddingHorizontal: theme.sizes.base*2,
    },
    avatar: {
      height: theme.sizes.base*2.4,
      width: theme.sizes.base*2.4,
      borderRadius: theme.sizes.base*1.2,
    }
})

SettingsScreen.propTypes ={
}

SettingsScreen.defaultProps ={
}

export default SettingsScreen;
