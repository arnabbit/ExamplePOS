import React, {Component} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import AddItemToCatalogue from './AddItemToCatalogue';

export default class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogueItems: [
        {name: 'Item 1', price: 5.0, stock: 5},
        {name: 'Item 2', price: 3.5, stock: 3},
      ],
      isAddItemVisible: false,
    };
  }

  componentDidMount(){
    const {isAddItemVisible,catalogueItems} = this.props.parentRef.current.state
    this.setState({
      isAddItemVisible,catalogueItems
    })
  }

  addToReceipt = item => {
    var {catalogueItems} = this.state;
    const receiptItems = [...this.props.parentRef.current.state.receiptItems, item];
    const totalAmount = this.calculateTotal(receiptItems);
    const discount = this.calculateDiscount(totalAmount);
    
    var itemName = item.name;
    catalogueItems.find(item => item.name === itemName).stock -= 1;
    this.setState({
      catalogueItems: catalogueItems,
      isAddItemVisible: false,
    },()=>{
      this.props.parentRef.current.setCatalogueItems(catalogueItems)
      // this.props.parentRef.current.toggleIsAddItemVisible()
      this.props.parentRef.current.setAmountAndDiscount(totalAmount,discount)
      this.props.parentRef.current.setReceiptItems(receiptItems)
    });
  };

  restoreStock = (item,quantity=1) => {
    console.log('quantity recieved is ', quantity);
    var {catalogueItems} = this.state;
    var itemName = item.name;
    catalogueItems.find(item => item.name === itemName).stock += quantity;
    this.setState({
      catalogueItems: catalogueItems,
    },()=>{
      this.props.parentRef.current.setCatalogueItems(catalogueItems)
    });
  };

  addToCatalogue = item => {
    this.setState({
      catalogueItems: [...this.state.catalogueItems, item],
    },()=>{
      this.props.parentRef.current.setCatalogueItems(this.state.catalogueItems)

    });
  };

  calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  calculateDiscount = (totalAmount) => {
    return totalAmount > 100 ? (totalAmount * 0.1).toFixed(2) : 0;
  };


  reduceStock =(item)=>{
    var {catalogueItems} = this.state;
    var itemName = item.name;
    catalogueItems.find(item => item.name === itemName).stock -= 1;
    this.setState({
      catalogueItems: catalogueItems,
    },()=>{
      this.props.parentRef.current.setCatalogueItems(catalogueItems)
    });
  }

  toggleAddItemScreen=()=>{
    this.setState({
      isAddItemVisible:!this.state.isAddItemVisible
    },()=>{
      this.props.parentRef.current.toggleIsAddItemVisible()
    })
  }
  render() {
    console.log('Rendering Catalogue Screen');
    return (
      <View style={styles.catalogue}>
        <Text style={{fontWeight:10,  fontSize:30, color:"#4CAF50", marginBottom: 20}}>Catalogue</Text>
        {this.state.catalogueItems.map((item,index) => {
          return (
            <Button
              title={item.name}
              key={index}
              disabled={!item.stock}
              onPress={() =>
                this.addToReceipt({
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                })
              }
              style={styles.button}
            />
          );
        })}

        <Button
          title="+ Add new item"
          onPress={this.toggleAddItemScreen}
          style={styles.button}
        />
        <View style={this.state.isAddItemVisible ? {} : {display: 'none'}}>
          <AddItemToCatalogue addToCatalogue= {this.addToCatalogue} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  catalogue: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // White background
    borderRightWidth: 1,
    borderRightColor: '#ccc', // Light gray border
  },
  button: {
    backgroundColor: '#007bff', // Blue button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    // marginVertical: 10,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});