import React,{Component} from 'react';
import {Text,View,ActivityIndicator,FlatList,Alert,Vibration} from 'react-native';
import * as ActionCreators from '../actionCreators/product';
import {bindActionCreators} from 'redux';
import ProductListItem from '../components/ProductListItem';
import { connect } from "react-redux";

let URI = "http://172.16.100.23:4000";

export class AdminComponent extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.actions.admingetProducts();
        this.props.actions.settoFalse();
      }

    _onDeleteTapped = id => {
        console.log("You pressed Id==>",id)
        Alert.alert(
            "Important",
            "DO YOU WANT TO DELETE",
            [
              {text:"NO",onPress:() => console.log("NOOOOO")},
              {text:'YES',onPress:()=>this.props.actions.deleteProduct(id)}
            ]
          )
    }

    _keyExtractor = (item, index) => {
        return `${index}`;
      };
    

    render(){
            return(
                <View>
                <FlatList
                    data={this.props.products}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}       
            />
            {this.props.isDeleted? Vibration.vibrate(1000):null}
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
            onWishTapped={this._onDeleteTapped}
            routeName={this.props.navigation.state.routeName}

          />
        );
      };
}

export function mapStateToProps(state){
    console.log("state in admin",state)
    return{
        products: state.productState.products,
        isDeleted:state.productState.deleted
    }
}

export function mapDispatchToProps(dispatch){
    return {
        actions:bindActionCreators(ActionCreators,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminComponent);