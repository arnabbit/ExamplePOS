// App.js
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import Header from './components/Header';
import Receipt from './components/Receipt';
import Catalogue from './components/Catalogue';
import PaymentScreen from './components/PaymentScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptItems: [],
      totalAmount: 0,
      discount: 0,
      catalogueItems: [
        {name: 'Item 1', price: 5.0, stock: 5},
        {name: 'Item 2', price: 3.5, stock: 3},
      ],
      isAddItemVisible: false
    }
    this.appRef = React.createRef()
    this.appRef.current = this
  }

  setReceiptItems = (receiptItems) =>{
    this.setState({receiptItems:receiptItems})
  }
  setCatalogueItems = (catalogueItems) =>{
    this.setState({catalogueItems:catalogueItems})
  }
  setAmountAndDiscount = (totalAmount,discount)=>{
    this.setState({totalAmount,discount})
  }
  toggleIsAddItemVisible = ()=>{
    this.setState({isAddItemVisible: !this.state.isAddItemVisible})
  }
  restoreStock = (item,quantity=1) => {
    console.log('quantity recieved is ', quantity);
    var {catalogueItems} = this.state;
    var itemName = item.name;
    catalogueItems.find(item => item.name === itemName).stock += quantity;
    this.setState({
      catalogueItems: catalogueItems,
    });
  };

  reduceStock =(item)=>{
    var {catalogueItems} = this.state;
    var itemName = item.name;
    catalogueItems.find(item => item.name === itemName).stock -= 1;
    this.setState({
      catalogueItems: catalogueItems,
    });
  }

  toggleAddItemScreen=()=>{
    this.setState({
      isAddItemVisible:true
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Catalogue
            key={`${this.state.catalogueItems}`}
            parentRef={this.appRef}
          />
          <Receipt
            key={`${this.state.receiptItems}-${this.state.totalAmount}${this.state.discount}`}
            parentRef={this.appRef}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>
              Total Payment - ${this.state.totalAmount - this.state.discount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  paymentButton: {
    backgroundColor: '#4CAF50', // Green payment button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});