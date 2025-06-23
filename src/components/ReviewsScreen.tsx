import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CommonHeader from '../navigation/Header/CommonHeader';
import { images } from '../assets/assets';
import { useRoute } from '@react-navigation/native';

type Review = {
  id: string;
  rate: number;
  name: string;
  date: string;
  comment: string;
};
const ReviewsScreen = ({ route }: any) => {
  const productId = route?.params?.productId;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://shopal.expozy.co/products/reviews/${productId}`);
        setReviews(response.data.comments || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

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

    reviews.forEach(({ rate }) => {
      sum += rate;

      if (rate >= 1 && rate <= 5) {
        distribution[rate as 1 | 2 | 3 | 4 | 5]++;
      }
    });

    const average = total > 0 ? (sum / total).toFixed(1) : '0.0';
    const percentages = {
      5: (distribution[5] / total) * 100,
      4: (distribution[4] / total) * 100,
      3: (distribution[3] / total) * 100,
      2: (distribution[2] / total) * 100,
      1: (distribution[1] / total) * 100,
    };

    return { average, total, distribution: percentages };
  };

  const { average, total, distribution } = calculateRatingStats(reviews);

  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.starRow}>
        {Array.from({ length: item.rate }).map((_, i) => (
          <Image
            key={`${item.id}-star-${i}`}
            source={images.star}
            style={styles.starIcon}
          />
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

  if (loading) {
    return (
      <View style={styles.container}>
        <CommonHeader title="Reviews" icon={null} onPress={undefined} page="goBack" />
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CommonHeader title="Reviews" icon={null} onPress={undefined} page="goBack" />

      <FlatList
        data={reviews}
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
