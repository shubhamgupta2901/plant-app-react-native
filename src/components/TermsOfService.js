import React from 'react';
import {Modal, ScrollView, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Block, Text, Button} from '../elements';
import {theme} from '../constants';

const termsOfService =(props) => {
    return (
        <Modal 
            visible = {props.visible}
            animationType = "slide" 
            onRequestClose = {props.onRequestClose}
        >
          <Block 
            padding = {[theme.sizes.padding * 2,theme.sizes.padding]}
            space = "between"
            color = {theme.colors.white}
          >
            <Text h2 light >Terms of Service</Text>
            <FlatList 
                style={{ marginVertical: theme.sizes.padding }}
                data={props.terms}
                renderItem= {({item, index}) => 
                    <Text 
                        key= {`${index}`}
                        caption 
                        gray 
                        height={24} 
                        style={{ marginBottom: theme.sizes.base }}>
                        {`${index+1}.${item}`}
                    </Text>
                }
            />  
            <Block 
              middle 
              padding = {[theme.sizes.padding/2,0]}>
                <Button gradient onPress = {props.onRequestClose}>
                  <Text center white> I agree</Text>
                </Button>
              </Block>
          </Block>
      </Modal>
    );
}

termsOfService.propTypes ={
    visible: PropTypes.bool,
    terms: PropTypes.arrayOf(PropTypes.string),
    onRequestClose: PropTypes.func,
}

termsOfService.defaultProps = {
    visible: false,
    terms: [
        'Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.',
        'You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.',
    ],
    onRequestClose: ()=>{},
}

export default termsOfService;
