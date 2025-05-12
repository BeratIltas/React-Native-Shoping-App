import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { usePaymentCards } from './PaymentCardContext';
import Colors from '../../../assets/colors';

type AddPaymentModalProps = {
    isVisible: boolean;
    onClose: () => void;
};

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ isVisible, onClose }) => {
    const { addCard } = usePaymentCards();

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    const handleCardNumberChange = (text: string) => {
        const rawText = text.replace(/\D/g, '').slice(0, 16);
        const formattedText = rawText.replace(/(.{4})/g, '$1 ').trim();

        setCardNumber(formattedText);
    };

    const handleExpiryChange = (text: string) => {
        const formattedText = text.replace(/\D/g, '').slice(0, 4);
        let displayText = formattedText;

        if (formattedText.length >= 3) {
            displayText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
        }

        setExpiry(displayText);
    };

    const handleNameOnCardChange = (text: string) => {
        setNameOnCard(text);
    };

    const handleAddCard = async () => {
        if (!cardNumber || !expiry || !nameOnCard) return;

        await addCard({ cardNumber, expiry, nameOnCard });
        onClose();

        setCardNumber('');
        setExpiry('');
        setNameOnCard('');
    };
    useEffect(() => {
        if (!isVisible) {
            setCardNumber('');
            setExpiry('');
            setNameOnCard('');
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
                <Text style={styles.title}>Add New Card</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    keyboardType="numeric"
                    maxLength={19}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Expiry Date (MM/YY)"
                    value={expiry}
                    onChangeText={handleExpiryChange}
                    keyboardType="numeric"
                    maxLength={5}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name on Card"
                    value={nameOnCard}
                    onChangeText={handleNameOnCardChange}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleAddCard}>
                    <Text style={styles.saveButtonText}>Save Card</Text>
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
        borderColor: '#ddd',
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

export default AddPaymentModal;
