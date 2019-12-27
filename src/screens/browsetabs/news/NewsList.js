import React, { Component } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { Container, Content, List, Text } from 'native-base';
import config from '../../../../config';

import DataItem from './DataItem';
import Modal from './modal';

const newsConfig = {
  baseUrl: 'https://newsapi.org/v2/everything',
  apiKey: config.NEWS_API_KEY,
  query: 'gardening',
  
  
}
export default class NewsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {}
    }
  }

  getArticles = async () => {
    try {
        let articles = await fetch(`${newsConfig.baseUrl}?apiKey=${newsConfig.apiKey}&q=${newsConfig.query}`);
        let result = await articles.json();
        console.log(result);
        articles = null;
        return result.articles;
    }
    catch (error) {
        throw error;
    }
}

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    });
  }

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    });
  }

  componentDidMount() {
    this.getArticles().then(data => {
      this.setState({
        isLoading: false,
        data: data
      });
    }, error => {
      Alert.alert('Error', 'Something went wrong!');
    }
    )
  }

  render() {
    console.log(this.state.data);

    let view = this.state.isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
        <Text style={{marginTop: 10}} children="Please Wait.." />
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={(item) => {
            return (
              <DataItem onPress={()=> {}} data={item} />
            )
        }} />
    )

    return (
      <Container>
        <Content>
          {view}
        </Content>
        <Modal 
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}