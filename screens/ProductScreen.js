import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  WebView,
  TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';

import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

var { height, width } = Dimensions.get('window');
export default class ProductScreen extends React.Component {
static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      product: [],
	  isSearch:true
    };
  }
  clickHdr(){
	this.setState({"isSearch":true,"product":[]});
  }
  productSelect(){
	alert("ff");
  }
  componentDidMount() {
    // alert(width)
    this.product = [];
	this.setState({"isSearch":true});
    //this.printFiles();	
  }
 
  async printFiles(searchTxt) {
    for (var i = 0; i < 10; i++) {
      var product = await this.fetchApi(searchTxt);
      if (product && product.status == 200 && product.data.length > 0) {
        this.product = product.data;
        break;
      }
    }
	this.product.sort( function( a, b ) { return b.productBaseInfo.productAttributes.maximumRetailPrice.amount - a.productBaseInfo.productAttributes.maximumRetailPrice.amount; } )
    this.setState({ product: this.product });
  }
  fetchApi(searchTxt) {
    return fetch('http://hackathoncts.herokuapp.com/flipkart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: searchTxt,
        limit: 10,
      }),
    }).then(function(d) {
      return JSON.parse(d._bodyText);
    });
  }
  textboxVal(){
	  var searchTxt = this.state.searchTxt;
	  this.setState({"isSearch":false,"product":[]});
	  this.printFiles(searchTxt)
  }
  render() {
	//alert(this.state);
	var $this = this;
    return (
      <View style={styles.container}>
		<View style={styles.Heading}>
			<Text style={styles.HeadingTxt}>{this.state && this.state.isSearch?"Search" : "Product"}</Text>
        </View>
		{
			this.state && this.state.isSearch?
			<View>
				<TextInput
				  ref="sad" 
				  style={{height: 50}}
				  placeholder="Search Text here"
				  onChangeText={(text) => this.setState({searchTxt:text})}
				/>
				<Button
				  onPress={this.textboxVal.bind(this)}
				  title="Search"
				  color="#841584"
				/>
			</View>
			:<View style={styles.containerBody}>
			  <ScrollView>
				{this.state && this.state.product && this.state.product.length > 0
				  ? this.state.product.map(function(list, i) {
					  return (
						<View key={i}>
						  <TouchableOpacity onPress={$this.productSelect.bind($this)}>
						  <View style={i == 0 ? styles.listFirst : styles.list}>
							<View style={styles.imageBox}>
								<Image
								  resizeMode="contain"
								  source={{uri: list.productBaseInfo.productAttributes.imageUrls["200x200"]}}
								  style={styles.canvas} />
							</View>
							<View style={styles.sidepanelBox}>
								<Text ellipsizeMode={"tail"} numberOfLines={2} style={styles.productHeading}>{list.productBaseInfo.productAttributes.title}</Text>
								<Text ellipsizeMode={"tail"} numberOfLines={3} style={styles.productDescription}>{list.productBaseInfo.productAttributes.productDescription}</Text>
								<View style={{flexDirection: 'row'}}>
								  <View style={{"width":"50%"}}>
									 <Text style={styles.price}>₹ {list.productBaseInfo.productAttributes.maximumRetailPrice.amount}</Text>
								  </View>
								  <View  style={{"width":"50%",justifyContent: 'flex-end'}}>
									  <Text style={styles.productId}>Product Id : {i} &nbsp;</Text>
								  </View>
								</View>
							</View>
						  </View>
						  <View style={styles.buybtn}>
						  </View>
						  </TouchableOpacity>
						</View>
					  );
					})
				  : <Text>Loading...</Text>}
			  </ScrollView>		  
				<TouchableOpacity style={styles.floatingButton} onPress={this.clickHdr.bind(this)}>
					<FontAwesome
						name={"search"}
						size={16}
						color={Colors.noticeText}
					  />
				</TouchableOpacity>
			</View>
		}
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  imageBox:{
    width:"35%",
    backgroundColor:"#fff"
  },
  sidepanelBox:{
    marginLeft:"2%",
    width:"63%"
  },
  productDescription:{
     fontSize:12
  },
  buybtn:{
    width:width,
    //height:35,
    backgroundColor:"#fff",
    borderBottomColor: '#47315a',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price:{
    justifyContent: 'center',
    fontWeight:"bold",
    fontSize:15,
    color:"#222"
  },
  productId:{
    justifyContent: 'center',
    fontWeight:"bold",
    fontSize:15,
    color:"#222",
    "textAlign":"right"
  },
  productHeading:{
    fontSize:17,
    fontWeight:"bold"
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  containerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeadingTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  canvas: {
	  position: 'absolute',
	  top: 5,
	  left: 0,
	  bottom: 5,
	  right: 0,
	},
  Heading: {
    width: width,
    height: 50,
    backgroundColor: '#222',
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
  },
  listFirst: {
    width: width,
     height:110,
    //height: (height - Constants.statusBarHeight - 10 * 3 - 50) / 4,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  list: {
    width: width,
    //height: (height - Constants.statusBarHeight - 10 * 3 - 50) / 4,
    height:110,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  floatingButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#222",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }

});