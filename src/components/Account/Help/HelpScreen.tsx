import { View, Text, StyleSheet, Platform, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CommonHeader from '../../../navigation/Header/CommonHeader'
import { images } from '../../../assets/assets'
import Colors from '../../../assets/colors'

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
}


const HelpScreen = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data: Message[] = [
                { id: '1', text: 'Hello, good morning.', sender: 'other', time: '10:41 pm' },
            ];

            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [newMessage, ...prev]);
        setInput('');

        try {
            const response = await fetch('https://shopal.expozy.co/customer-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error('API hatası');
            }

            const data = await response.json();

            const replyText = data.response;

            const replyMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: replyText,
                sender: 'other',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages(prev => [replyMessage, ...prev]);

        } catch (error) {
            console.error('Mesaj gönderilemedi:', error);
        }
    };



    const renderItem = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'me' ? styles.messageRight : styles.messageLeft
        ]}>
            <Text style={[
                styles.messageText,
                item.sender === 'me' ? styles.textRight : styles.textLeft
            ]}>
                {item.text}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
        </View>
    );

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    }, [messages]);



    const handleCall = () => {
        const phoneNumber = 'tel:+905555555555';
        Linking.openURL(phoneNumber).catch(err =>
            console.error('Arama başlatılamadı:', err)
        );
    };


    return (
        <View style={styles.container} >
            <CommonHeader
                title='Help'
                icon={images.phone}
                onPress={handleCall}
                page='goBack'
            />
            <View style={styles.divider} />
            <KeyboardAvoidingView
                style={styles.chatcontainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.messagesList}
                    inverted
                    keyboardShouldPersistTaps="handled"
                    removeClippedSubviews={false}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Write your message..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Image
                            source={images.send}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        flex: 1,
        backgroundColor: Colors.white,
    },
    chatcontainer: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: 50,
    },
    divider: {
        height: 0.5,
        backgroundColor: Colors.extraLightGray,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    messagesList: {
        padding: 16,
        paddingBottom: 100,
    },
    messageContainer: {
        maxWidth: '80%',
        marginBottom: 12,
        borderRadius: 16,
        padding: 10,
    },
    messageLeft: {
        backgroundColor: '#f2f2f2',
        alignSelf: 'flex-start',
    },
    messageRight: {
        backgroundColor: Colors.gray,
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 16,
        marginBottom: 4,
    },
    textLeft: {
        color: '#000',
    },
    textRight: {
        color: '#fff',
    },
    timeText: {
        fontSize: 10,
        color: '#888',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    input: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        fontSize: 16,
        marginRight: 8,
    },
    sendButton: {
        width: 40,
        height: 40,
        backgroundColor: Colors.gray,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        tintColor: 'white',
        width: 20,
        height: 20,
    },
})
export default HelpScreen