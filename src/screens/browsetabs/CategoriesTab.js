import React from 'react';
import {Dimensions,StyleSheet,ScrollView, TouchableOpacity, Image} from 'react-native'
import PropTypes from 'prop-types';
import {Block, Card, Badge, Text} from '../../elements';
import {theme, mocks} from '../../constants';

const { width } = Dimensions.get('window');
class CategoriesTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  renderCategory = (category) => {
    return(
      <TouchableOpacity 
        key={category.id}
        onPress={()=>this.props.onCategoryClicked(category.name)}
      >
        <Card center middle shadow style ={styles.category} >
          <Badge margin = {[0,0,15,0]} size = {theme.sizes.base*3} color = {theme.colors.badgeTint}>
            <Image source={category.image}/> 
          </Badge>
          <Text medium height={20}>{category.name}</Text>
          <Text gray caption>{`${category.count} Products`}</Text>
        </Card>
        
      </TouchableOpacity>
    );
  }

  renderCategories = () => {
    return (
      <Block row space="between" style={styles.categories}>
        {this.props.categories.map(category => this.renderCategory(category))}
      </Block>
    );
  }
  render(){
    return (
      <ScrollView 
        showsVerticalScrollIndicator = {false}
        style = {{paddingVertical: theme.sizes.base *2}}
      >
       {this.renderCategories()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categories: {
      flexWrap: 'wrap',
      paddingHorizontal: theme.sizes.base *2,
      marginBottom: theme.sizes.base* 3.5,
    },
    category:{
      minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
      maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
      maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    },
});

CategoriesTab.propTypes ={
  categories: PropTypes.arrayOf(PropTypes.object),
  onCategoryClicked: PropTypes.func,
}

CategoriesTab.defaultProps ={
  categories: mocks.categories,
  onCategoryClicked: ()=>{},
}

export default CategoriesTab;
