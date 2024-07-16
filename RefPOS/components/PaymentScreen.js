import React, { Component } from 'react';
import { View, Text, Modal, Button, StyleSheet, Alert } from 'react-native';

export default class PaymentScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      confirmPayment: false,
      isVisible: false,
      totalAmount:0,
      discount:0
    }
    this.receiptRef = props.receiptRef
  }

  componentDidMount(){
    if(this.receiptRef.current){
      var { totalAmount, discount } = this.receiptRef.current.state;
      this.setState({totalAmount,discount})
    }
  }

  togglePaymentScreen =()=>{
    if(this.state.confirmPayment){
      this.receiptRef.current.clearReceipt()
    }
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  setAmountAndDiscount = (totalAmount,discount)=>{
    this.setState({totalAmount,discount})
  }

  confirmPayment =()=>{
    this.setState({
      confirmPayment: true
    })
    alert("Payment Confirmed")
  }
  render() {
    console.log("Rendering Payment Screen");

    return (
      <Modal visible={this.state.isVisible} animationType="slide">
        <View style={styles.paymentScreen}>
          <Text>Payment Screen</Text>
          <Text>Total Amount: ${this.state.totalAmount}</Text>
          <Text>Discount: ${this.state.discount}</Text>
          <Button title="Confirm Payment" onPress={this.confirmPayment} />
          <Button title="Close" onPress={this.togglePaymentScreen} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  paymentScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});
