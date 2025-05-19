import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { images } from '../assets/assets';
import CommonHeader from '../navigation/Header/CommonHeader';

type Review = {
    id: string;
    rating: number;
    name: string;
    date: string;
    comment: string;
};

const fakeReviews: Review[] = [
    {
        id: '1',
        rating: 5,
        name: 'Wade Warren',
        date: '6 days ago',
        comment: 'The item is very good, my son likes it very much and plays every day.',
    },
    {
        id: '2',
        rating: 4,
        name: 'Guy Hawkins',
        date: '1 week ago',
        comment: 'The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!',
    },
    {
        id: '3',
        rating: 4,
        name: 'Robert Fox',
        date: '2 weeks ago',
        comment: 'I just bought it and the stuff is really good! I highly recommend it!',
    },
    {
        id: '4',
        rating: 3,
        name: 'Test User',
        date: '3 weeks ago',
        comment: 'It’s okay, but could be better in quality.',
    },
    {
        id: '5',
        rating: 1,
        name: 'Test User',
        date: '3 weeks ago',
        comment: 'It’s okay, but could be better in quality.',
    },
];

const calculateRatingStats = (reviews: Review[]) => {
    const total = reviews.length;
    let sum = 0;
    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };

    reviews.forEach(({ rating }) => {
        sum += rating;
        distribution[rating as 1 | 2 | 3 | 4 | 5]++;
    });

    const average = total > 0 ? (sum / total).toFixed(1) : '0.0';
    const percentages = {
        5: (distribution[5] / total) * 100,
        4: (distribution[4] / total) * 100,
        3: (distribution[3] / total) * 100,
        2: (distribution[2] / total) * 100,
        1: (distribution[1] / total) * 100,
    };

    return {
        average,
        total,
        distribution: percentages,
    };
};

const ReviewsScreen = () => {
    const { average, total, distribution } = calculateRatingStats(fakeReviews);

    const renderItem = ({ item }: { item: Review }) => (
        <View style={styles.reviewItem}>
            <View style={styles.starRow}>
                {Array.from({ length: item.rating }).map((_, i) => (
                    <Image key={i} source={images.star} style={styles.starIcon} />
                ))}
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.meta}>{item.name} • {item.date}</Text>
        </View>
    );

    const renderRatingBar = (stars: number) => {
        const percent = distribution[stars as 1 | 2 | 3 | 4 | 5];

        return (
            <View key={stars} style={styles.ratingRow}>
                <View style={styles.ratingLabel}>
                    <Image source={images.star} style={styles.smallStarIcon} />
                    <Text style={styles.ratingText}>{stars}</Text>
                </View>
                <View style={styles.barBackground}>
                    <View style={[styles.barFill, { width: `${percent}%` }]} />
                </View>
                <Text style={styles.percentText}>{percent.toFixed(0)}%</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CommonHeader title="Reviews" icon={null} onPress={undefined} page="goBack" />

            <FlatList
                data={fakeReviews}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.header}>{average} ★</Text>
                        <Text style={styles.subHeader}>{total} Ratings</Text>

                        <View style={styles.ratingDistribution}>
                            {[5, 4, 3, 2, 1].map(renderRatingBar)}
                        </View>

                        <Text style={styles.reviewHeader}>{total} Reviews</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 16,
        color: '#555',
    },
    ratingDistribution: {
        marginBottom: 24,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 50,
    },
    smallStarIcon: {
        width: 14,
        height: 14,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 14,
    },
    barBackground: {
        flex: 1,
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 4,
        marginHorizontal: 8,
    },
    barFill: {
        height: 8,
        backgroundColor: '#FFA500',
        borderRadius: 4,
    },
    percentText: {
        width: 40,
        textAlign: 'right',
        fontSize: 12,
        color: '#555',
    },
    reviewHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    reviewItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    starRow: {
        flexDirection: 'row',
    },
    starIcon: {
        width: 16,
        height: 16,
        marginRight: 2,
    },
    comment: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 20,
    },
    meta: {
        marginTop: 4,
        fontSize: 12,
        color: '#777',
    },
});

export default ReviewsScreen;
