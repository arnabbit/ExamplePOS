import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptItems: [],
      totalAmount: 0,
      discount: 0,
    };
  }

  componentDidMount(){
    const {receiptItems,totalAmount, discount} = this.props.parentRef.current.state
    this.setState({
      receiptItems:receiptItems,
      totalAmount:totalAmount,
      discount:discount
    })
  }

  addToReceipt = (item) => {
    this.setState((prevState) => {
      const updatedItems = [...prevState.receiptItems, item];
      const totalAmount = this.calculateTotal(updatedItems);
      const discount = this.calculateDiscount(totalAmount);
      this.props.parentRef.current.setAmountAndDiscount(totalAmount,discount)
      this.props.parentRef.current.setReceiptItems(updatedItems)
    });
  };

  removeFromReceipt = (index) => {
    this.setState((prevState) => {
      const poppedItem = prevState.receiptItems.filter((_, i) => i == index);
      const updatedItems = prevState.receiptItems.filter((_, i) => i !== index);
      const totalAmount = this.calculateTotal(updatedItems);
      const discount = this.calculateDiscount(totalAmount);
      this.props.parentRef.current.setAmountAndDiscount(totalAmount,discount)
      this.props.parentRef.current.setReceiptItems(updatedItems)
      this.props.parentRef.current.restoreStock(poppedItem[0],poppedItem[0].quantity)
      return {
        receiptItems: updatedItems,
        totalAmount,
        discount,
      };
    });
  };

  updateQuantity = (index, newQuantity) => {
    this.setState((prevState) => {
      const updatedItems = [...prevState.receiptItems];
      updatedItems[index].quantity = newQuantity;
      const totalAmount = this.calculateTotal(updatedItems);
      const discount = this.calculateDiscount(totalAmount);
      this.props.parentRef.current.reduceStock(updatedItems[index])
      this.props.parentRef.current.setAmountAndDiscount(totalAmount,discount)
      this.props.parentRef.current.setReceiptItems(updatedItems)
      return {
        receiptItems: updatedItems,
        totalAmount,
        discount,
      };
    });
  };

  clearReceipt=()=>{
    this.setState({
      receiptItems: [],
      totalAmount: 0,
      discount: 0
    },()=>{
      this.props.parentRef.current.setAmountAndDiscount(0,0)
      this.props.parentRef.current.setReceiptItems([])
    })
  }

  calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  calculateDiscount = (totalAmount) => {
    return totalAmount > 100 ? (totalAmount * 0.1).toFixed(2) : 0;
  };

  render() {
    const { receiptItems, totalAmount, discount } = this.state;
    console.log("Rendering Receipt Screen");
    return (
      <View style={styles.receipt}>
        <Text style={{fontWeight:10,  fontSize:30, color:"#4CAF50"}}>Receipt</Text>
        {receiptItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={{fontWeight:"bold"}}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Remove" onPress={() => this.removeFromReceipt(index)} />
              <Button
                title="Increase Quantity"
                onPress={() => this.updateQuantity(index, item.quantity + 1)}
              />
            </View>
          </View>
        ))}
        <Text style={{fontSize:20, fontWeight:'bold'}}>Total Amount: ${totalAmount}</Text>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Discount: ${discount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  receipt: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa', // Very light gray background
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
