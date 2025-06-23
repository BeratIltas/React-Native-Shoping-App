import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import { images } from '../../assets/assets';
import CommonHeader from '../../navigation/Header/CommonHeader';
import { useAuth } from '../Account/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../assets/typography';
import LottieView from 'lottie-react-native';

const WIDTH = Dimensions.get('window').width;

interface RecommendationItem {
    emoji: string;
    name: string;
    brand: string;
    price: number;
    description: string;
}

interface ProductInfo {
    product_id: number;
    title: string;
    price: number;
    categories: string[];
    merchant_name: string;
    average_rating: number;
    rating_count: number;
    meta_data: { [key: string]: string }[];
    product_images: string[];
}

const FashionRecommendationScreen = () => {
    const [input, setInput] = useState('');
    const [summary, setSummary] = useState('');
    const [detailedItems, setDetailedItems] = useState<ProductInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuth();
    const navigation: any = useNavigation();

    const handleSubmit = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.post('https://shopal.expozy.co/fashion_recommendation', {
                user_input: input,
                name: user?.displayName || 'Guest',
                user_budget_segment: 'medium',
            });

            setSummary(res.data.recommendation.summary);
            const items = res?.data?.recommendation?.detailed_items;

            if (!Array.isArray(items)) {
                setDetailedItems([]);
                return;
            }

            const itemDetails = await Promise.all(
                items.map(async (item: RecommendationItem) => {
                    const infoRes = await axios.get(
                        `https://shopal.expozy.co/product-info/?product_name=${(item.name)}`
                    );
                    return infoRes.data;
                })
            );

            setDetailedItems(itemDetails);
        } catch (err) {
            console.error('Recommendation error:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: ProductInfo }) => {
        const imageUri =
            Array.isArray(item.product_images) && item.product_images.length > 0
                ? item.product_images[0]
                : 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg';

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('ProductDetails', { product_id: item.product_id })}
            >
                <Image source={{ uri: imageUri }} style={styles.image} />
                <View style={styles.cardContent}>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.merchant}>{item.merchant_name}</Text>
                        <View style={styles.starContainer}>
                            <Image source={images.star} style={styles.starIcon} />
                            <Text>{item.average_rating?.toFixed(1) ?? '0.0'}</Text>
                        </View>
                    </View>
                    <Text style={styles.price}>{item.price}₺</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteGray }}>
            <CommonHeader title='Fashion Assistant' page='goBack' icon={null} />

            {error && !loading ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>An error occurred, try again.</Text>
                </View>
            ) : (
                <FlatList
                    data={detailedItems}
                    keyExtractor={(item) => item.product_id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.container}
                    removeClippedSubviews={false}
                    ListHeaderComponent={
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                            <View style={styles.inputContainer}>
                                <LinearGradient
                                    colors={['#B210FF', '#EECE13']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.inputWrapper}
                                >
                                    <View style={styles.inputInner}>
                                        <Image source={images.AiRobot}></Image>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="What are you looking for today?"
                                            value={input}
                                            onChangeText={setInput}
                                            placeholderTextColor="#999"
                                        />
                                    </View>
                                </LinearGradient>
                                <TouchableOpacity onPress={handleSubmit}>
                                    <LinearGradient
                                        colors={['#B210FF', '#EECE13']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.buttonGradient}
                                    >
                                        <Text style={[typography.Body2, styles.buttonText]}>Get Recommendation</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            {loading && (
                                <View style={styles.loadingContainer}>
                                    <LottieView
                                        source={require('../../assets/Animations/AiSearch.json')}
                                        autoPlay
                                        loop
                                        style={{ width: 150, height: 150 }}
                                    />
                                </View>
                            )}
                            {summary?.length > 0 && (
                                <View style={styles.summaryBox}>
                                    <Text style={[typography.Body1Medium, styles.summaryText]}>{summary}</Text>
                                </View>
                            )}
                        </KeyboardAvoidingView>
                    }
                    ListFooterComponent={<View style={{ height: 100 }} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F8F8F8',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        padding: 2,
        borderRadius: 16,
        marginBottom: 15,
    },
    inputInner: {
        gap: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    input: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    buttonGradient: {
        height: 54,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B210FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    summaryBox: {
        flexDirection: 'row',
        backgroundColor: '#fcfcfc',
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#B210FF',
    },

    summaryText: {
        flex: 1,
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 14,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: WIDTH - 64,
        height: 200,
        borderRadius: 14,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111',
        marginBottom: 2,
    },
    merchant: {
        color: '#888',
        fontSize: 14,
    },
    price: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.green,
        textAlign: 'right',
        flex: 1,
        alignSelf: 'center',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    starIcon: {
        height: 16,
        width: 16,
        marginRight: 4,
        tintColor: '#FFC107',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    errorText: {
        color: '#cc0000',
        fontSize: 16,
        fontWeight: '600',
    },
});



export default FashionRecommendationScreen;
