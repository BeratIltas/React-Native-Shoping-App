import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { images } from '../../../assets/assets';
import Colors from '../../../assets/colors';

interface Props {
    visible: boolean;
    onClose: () => void;
    product_name?: string;
    product_id?: number
}

const CommentModal: React.FC<Props> = ({ visible, onClose, product_name, product_id }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);

    const handleSend = () => {
        console.log('Yıldız:', rating ,'Yorum:', comment, 'productid',product_id);
        setComment('');
        setRating(5);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={() => {  }}>
                        <View style={styles.bottomSheet}>
                            <Text style={styles.title}>Leave a review for:</Text>
                            <Text style={styles.productName}>{product_name}</Text>

                            <View style={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                        <Image
                                            source={images.star}
                                            style={[
                                                styles.star,
                                                star <= rating
                                                    ? { tintColor: undefined }
                                                    : { tintColor: Colors.extraLightGray },
                                            ]}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Write your comment"
                                value={comment}
                                onChangeText={setComment}
                                multiline
                                textAlignVertical="top"
                            />

                            <TouchableOpacity onPress={handleSend} style={styles.sendButton} activeOpacity={0.8}>
                                <Text style={styles.sendButtonText}> Send Review</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productName: {
        fontSize: 16,
        marginBottom: 16,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    star: {
        width: 32,
        height: 32,
        marginHorizontal: 5,
        resizeMode: 'contain',
    },
    input: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    sendButton: {
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.orange,
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 20,
        elevation: 5,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 1,
    },
});

export default CommentModal;
