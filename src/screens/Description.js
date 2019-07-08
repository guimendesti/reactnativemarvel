import React, { Component } from 'react'
import {ScrollView, Image, Dimensions, Text, View, FlatList, TouchableOpacity} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width

export default class Description extends Component {
    static navigationOptions = {
        title: 'Detalhes'
    }

    _renderItem = ({item}) => {
        return  (
            <Text style={{paddingHorizontal: 10, paddingVertical: 5}}>{item.name}</Text>
        )
    }

    render() {
        const { hero } = this.props.navigation.state.params
        return (
            <ScrollView>
                <Image
                    source={{uri: `${hero.thumbnail.path.replace('http://','https://')}.${hero.thumbnail.extension}`}}
                    style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                />
                <Text style={{padding:10, fontSize:20}}>{hero.name}</Text>
                <Text style={{padding:10}}>{hero.description}</Text>

                <View style={{padding:10}}>
                    <Text style={{paddingVertical:5, fontWeight:'bold'}}>Quadrinhos:</Text>
                    <FlatList
                        data={hero.comics.items}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={()=> <View style={{height:1, backgroundColor: '#f7f7f7'}} />}
                    />
                </View>
            </ScrollView>
        )
    }
}