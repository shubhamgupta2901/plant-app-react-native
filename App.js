
import React from 'react';
import {View} from 'react-native'
import {AppLoading} from 'expo';
import AppContainer from './src/navigation';
import * as PreloadingAssets from './src/utils/PreloadingAssets';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {isReady: false};
    }

    loadAssetsAsynchrously = () =>{
        const imageAssets = PreloadingAssets.cacheImages();
        const fontsAssets = PreloadingAssets.cacheFonts();
    }

    render(){
        console.disableYellowBox = true;
        if(this.state.isReady){
            return (
                <AppLoading
                    startAsync={this.loadAssetsAsynchrously}
                    onFinish = {() =>this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }
        else{
            return(
                <View style={{ flex: 1 }}>
                    <AppContainer/>
                </View>
            );
        }
    };
}

export default App;