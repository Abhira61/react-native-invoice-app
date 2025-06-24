import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { generateInvoiceHTML } from '../utils/generateHtml';

export default function CreateInvoice() {
  const [invoice, setInvoice] = useState({
    clientName: '',
    clientAddress: '',
    invoiceNumber: 'INV-12',
    invoiceDate: 'Jun 24, 2025',
    dueDate: 'Jul 24, 2025',
    notes: 'It was a pleasure doing business with you.',
    
    items: [{ description: 'UPVC Profiles', qty: 5000, rate: 120 }],
  });

  const calculateTotals = () => {
    const subTotal = invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const tax = subTotal * 0.18;
    const total = subTotal + tax;
    return { subTotal, tax, total };
  };

  const handlePDF = async () => {
    const { subTotal, tax, total } = calculateTotals();
    const html = generateInvoiceHTML({ ...invoice, subTotal, tax, total });

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (err) {
      Alert.alert("Error", "Could not generate PDF");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Invoice Generator</Text>
      <TextInput style={styles.input} placeholder="Client Name"
        value={invoice.clientName}
        onChangeText={(text) => setInvoice({ ...invoice, clientName: text })} />
      <TextInput style={styles.input} placeholder="Client Address"
        value={invoice.clientAddress}
        onChangeText={(text) => setInvoice({ ...invoice, clientAddress: text })} />
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Line Items:</Text>
      {invoice.items.map((item, index) => (
        <View key={index}>
          <TextInput style={styles.input} placeholder="Description"
            value={item.description}
            onChangeText={(text) => {
              const items = [...invoice.items];
              items[index].description = text;
              setInvoice({ ...invoice, items });
            }} />
          <TextInput style={styles.input} placeholder="Qty" keyboardType="numeric"
            value={item.qty.toString()}
            onChangeText={(text) => {
              const items = [...invoice.items];
              items[index].qty = parseInt(text) || 0;
              setInvoice({ ...invoice, items });
            }} />
          <TextInput style={styles.input} placeholder="Rate" keyboardType="numeric"
            value={item.rate.toString()}
            onChangeText={(text) => {
              const items = [...invoice.items];
              items[index].rate = parseFloat(text) || 0;
              setInvoice({ ...invoice, items });
            }} />
        </View>
      ))}
      <Button title="Add Item" onPress={() => {
        setInvoice({ ...invoice, items: [...invoice.items, { description: '', qty: 1, rate: 0 }] });
      }} />
      <TextInput style={styles.input} placeholder="Notes"
        value={invoice.notes}
        onChangeText={(text) => setInvoice({ ...invoice, notes: text })} />
      <Button title="Generate Invoice PDF" onPress={handlePDF} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginVertical:8, padding: 10
  },
  heading: {
    marginTop:25 ,fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  }
});