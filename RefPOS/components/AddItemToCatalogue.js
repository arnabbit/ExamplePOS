import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default class AddItemToCatalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
          itemName: '',
          itemPrice: '',
          itemStock: '1', // Default quantity to 1
        };
      }
    
      handleInputChange = (field, value) => {
        this.setState({ [field]: value });
      };
    
      addItemToCatalogue = () => {
        const { itemName, itemPrice, itemStock } = this.state;
    
        // Basic validation (you might want more robust validation)
        if (!itemName || !itemPrice) {
          alert('Please fill in item name and price');
          return;
        }
    
        const newItem = {
          name: itemName,
          price: parseFloat(itemPrice), // Parse price as a float
          stock: parseInt(itemStock, 10), // Parse quantity as an integer
        };
    
        this.props.addToCatalogue(newItem)
        this.setState({
          itemName: '',
          itemPrice: '',
          itemStock: '1',
        });
      };
    
      render() {
        const { itemName, itemPrice, itemStock } = this.state;
    
        return (<>
          <View style={styles.container}>
            <Text>Add Item to Catalogue</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={itemName}
              onChangeText={(text) => this.handleInputChange('itemName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={itemPrice}
              onChangeText={(text) => this.handleInputChange('itemPrice', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Stock"
              keyboardType="numeric"
              value={itemStock}
              onChangeText={(text) => this.handleInputChange('itemStock', text)}
            />
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={this.addItemToCatalogue}>
                <View><Text style={{fontSize:20, color:"white"}}>+Add this item</Text></View>
            </TouchableOpacity>
          </View>
          </>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
      },
      box:{
        marginTop:150,
        backgroundColor:"red",
        fontSize:20,
        fontWeight:10,
        padding:10
      }
    });