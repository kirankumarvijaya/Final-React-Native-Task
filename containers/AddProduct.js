import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Picker,Alert,Text,Platform } from 'react-native';
import * as ActionCreators from '../actionCreators/product';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

let URI = "http://172.16.100.23:4000";

export class AddProduct extends Component {
  static navigationOptions= {
    title: "Add",
    headerStyle: {
      backgroundColor: "#00ff80"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    },
  }
  constructor(props) {
    super(props);
    // this.state = {
    //   title: '',
    //   titleError:null,
    //   category: 'Mobiles',
    //   additionalInfo: '',
    //   categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
    //   price:''
    // }
  }

  componentWillMount(){
    this.props.actions.settoFalse();
  }

  handleSubmit = () => { //own code here wrap inside a single object
    // let {
    //   title,
    //   category,
    //   additionalInfo,
    //   price
    // } = this.props;
    // // change this
    // if(!title){
    //   // this.setState({titleError:'Title is required'})
    //   this.props.actions.titleError();
    //   return;
    // }
    // fetch(`${URI}/products`, {
    //   body: JSON.stringify({
    //     title,
    //     category,
    //     additionalInfo,
    //     price
    //   }),
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    // }).then(p => {Alert.alert('Success','Product Saved Successfully')})
    let product={
        title:this.props.title,
        category:this.props.category,
        additionalInfo:this.props.additionalInfo,
        price:this.props.price
      }
    this.props.actions.addProduct(product)
  }

  renderCategories = () => {
    console.log("values in props",this.props)
    return this.props.categories.map(c => <Picker.Item key={c} label={c} value={c} />)
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.control}
          onChangeText={(title) => {
            // this.setState({ title,titleError:null })//actionCreate to getProductDetails(text,'title')
                this.props.actions.getProductDetails(title,'title')
            if(title.length==0){
              // this.setState({ titleError:'Title is required' })//actionCreate to titleerror()
              this.props.actions.titleError()
            }
          }}
          value={this.props.title}
          placeholder="Product Name"
          placeholderTextColor="grey"
        />
        {this.props.titleError && <Text style={{color:'red'}}>Title is required</Text>} 
        {/* this.props.titleError */}
        <TextInput
          numberOfLines={5}
          onFocus={
            ()=>{
              if(this.props.title.length==0){
                this.props.actions.titleError()
              }
            }
          }
          onChangeText={(additionalInfo) => this.props.actions.getProductDetails(additionalInfo,'additionalInfo')}//actionCreate to getProductDetails(text,'title')
          multiline={true}
          value={this.props.additionalInfo}
          placeholder="Additional Info"
          placeholderTextColor="grey"
          style={styles.additionalInfo}
        />
        <TextInput
          style={styles.control}
          onChangeText={(price) => this.props.actions.getProductDetails(price,'price')}//actionCreate to getProductDetails(text,'title')
          value={this.props.price}
          placeholder="Product Price"
          placeholderTextColor="grey"
          keyboardType="number-pad"
        />
        <Picker
          selectedValue={this.props.category}
          onValueChange={(itemValue, itemIndex) => this.props.actions.getProductDetails(itemValue,'category')}>
          {/* //actionCreate to getProductDetails(text,'title') */}
          {this.renderCategories()}
        </Picker>
        <Button
          title="Add"
          onPress={this.handleSubmit}  //actionCreate to addProduct
        />
      {this.props.isAdded ? Alert.alert('Success','Product Saved Successfully',
              [{text:'OK',onPress:()=>this.props.actions.settoFalse()}])
        :null}        
      </View>
    );
  }
}

export function mapStateToProps(state){
  console.log("state variable",state)
  return{
    category:state.productState.category,
    additionalInfo:state.productState.additionalInfo,
    categories:state.productState.categories,
    price:state.productState.price,
    titleError:state.productState.titleError,
    isAdded:state.productState.added,
    title:state.productState.titleName,
  }
}

export function mapDispatchToProps(dispatch){
  return{
    actions:bindActionCreators(ActionCreators,dispatch)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    backgroundColor: '#ffffff',
  },
  control:{
    ...Platform.select({
      android:{
        height:40
      },
      ios:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'grey',
        marginTop:20,
        marginBottom:20
      }
    })
  },
  additionalInfo:{
    ...Platform.select({
      ios:{
        height:80
      }
    })
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct);
