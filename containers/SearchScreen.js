import React,{Component} from 'react';
import {View,Text,TextInput,Dimensions,FlatList} from 'react-native';
import * as ActionCreators from '../actionCreators/product';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ProductListItem from '../components/ProductListItem';

let URI = "http://172.16.100.23:4000";

export class SearchScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log("searched list are ====>",this.props.matchedProductList);
        return(
            <View>
            <View style={{backgroundColor:'#c9c8cd',flexDirection:'row'}}>
                <Ionicons name="ios-search" size={35} color="#fff"
                    style={{paddingLeft:7,paddingTop:3}}
                />
                <TextInput
                    style={
                        {   height:40,
                            flex:8,
                            // width:Dimensions.get('window').width*0.8,
                            backgroundColor:'white',
                            borderColor:'black',
                            borderRadius:10,
                            marginLeft:10,
                            marginRight:10,
                            marginTop:4,
                            marginBottom:4,
                            paddingLeft:10
                        }}
                        placeholder={"Search Products"}
                        placeholderTextColor={'#c9c8cd'}
                        onChangeText={(text)=>this.props.actions.searchProducts(text)}
                />
            </View>
            {this.props.searchBarActive ?
                            <FlatList
                                data={this.props.matchedProductList}
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}/>:null}
            </View>
        )
    }

    _renderItem = ({ index, item }) => {
        return (
          <ProductListItem
            {...this.props}
            id={item.id}
            title={`${item.id} - ${item.title}`}
            image={item.image ? `${URI}/images/${item.image}` : null}
            rating={item.rating}
            price={item.price}
            wish={item.wish || false}
            onWishTapped={this.onWishTapped}
            routeName={this.props.navigation.state.routeName}
          />
        );
      };
}

export function mapStateToProps(state){
    return{
        matchedProductList:state.productState.searchedProducts,
        searchBarActive:state.productState.isSearchActive
    }
}

export function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(ActionCreators,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchScreen);
