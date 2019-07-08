import React from 'react'
import {TouchableOpacity, View, FlatList, Text, Image, ScrollView} from 'react-native'
import md5 from 'js-md5'
import Moment from 'moment';
Moment.locale('pt-BR')

// const PUBLIC_KEY = 'ee4bcadbdb8bbe93903d81bc07416684'
// const PRIVATE_KEY = '9f3c7fa4431e4607b2e777142d5494402f3e0e2f'

const PUBLIC_KEY = 'da4962c5e9129a1284cc8adc3a7329ef'
const PRIVATE_KEY = '7341c92965898dadbf7f4252bd693afd395b02d9'


export default class Home extends React.PureComponent {
    static navigationOptions = {
        title: 'React-Native / Marvel'
    }

    state = {
        data: [],
        loadpage: 1
    }

    componentDidMount() {
        this._remoteMarvelRequest();
    };

    /**
     * Requisicao Marvel com Offset automatico para carregamento sob demanda (scroll)
     */
    _remoteMarvelRequest = () => {
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const limit = 50
        const offset = (this.state.loadpage * limit) - limit

        const urlMarvel = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&offset=${offset}&limit=${limit}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`

        fetch(urlMarvel)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: [...this.state.data, ...res.data.results],
                    loadpage: this.state.loadpage + 1
                });

            })

    };

    _handleLoadMore = () => {
        this._remoteMarvelRequest()
    };

    _renderItem = ({item}) => {
        return  (
            <TouchableOpacity onPress={()=>this._onItemPress(item)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                <Image style={{height: 50, width: 50, borderRadius: 25}} source={{uri: `${item.thumbnail.path.replace('http://','https://')}.${item.thumbnail.extension}` }} />
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 5, lineHeight: 20, marginLeft: 10}} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={{paddingHorizontal:10, paddingRight:60, color:'#999999', lineHeight: 16}} numberOfLines={1} ellipsizeMode='tail'>
                        {item.description}
                    </Text>
                    <Text style={{paddingHorizontal:10, color:'#cccccc', fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                        Atualizado: {Moment(item.modified).format('DD/MM/YYYY HH:mm:ss')}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Description', {hero: item})
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={()=> <View style={{height:1, backgroundColor: '#f7f7f7'}} />}
            />
        )
    }
}