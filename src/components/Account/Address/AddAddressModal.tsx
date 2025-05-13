import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { useAddresses } from './AddressContext';
import Colors from '../../../assets/colors';

type AddAddressModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isVisible, onClose }) => {
  const { addAddress } = useAddresses();

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const handleSave = async () => {
    if (!name || !street || !city || !zip || !country) return;

    await addAddress({
      name,
      street,
      city,
      zip,
      country,
    });

    onClose();
  };

  useEffect(() => {
    if (!isVisible) {
      setName('');
      setStreet('');
      setCity('');
      setZip('');
      setCountry('');
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.4}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>Add New Address</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Street" value={street} onChangeText={setStreet} />
        <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
        <TextInput style={styles.input} placeholder="ZIP Code" value={zip} onChangeText={setZip} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Country" value={country} onChangeText={setCountry} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.extraLightGray,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddAddressModal;
