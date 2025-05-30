import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/colors';
import { Item, ProductProps } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { images } from '../assets/assets';
import typography from '../assets/typography';

const { width } = Dimensions.get('window');

type Props = {
  item: {
    _id: string;
    image: any;
    brand: string;
    category: string;
  };
};
const gradientColors = [
  ['#f7971e', '#ffd200'],     // Turuncu → Sarı
  ['#ff512f', '#dd2476'],     // Kırmızımsı Turuncu → Pembe (canlı sıcaklık)
  ['#ff9966', '#ff5e62'],     // Açık Turuncu → Mercan
  ['#fc4a1a', '#f7b733'],     // Koyu Turuncu → Sarımsı Turuncu
  ['#ff6a00', '#ee0979'],     // Turuncu → Mor-pembe (yoğun sıcak geçiş)
  ['#ff9a9e', '#fecfef'],     // Açık Pembe → Çok Açık Pembe (tatlı sıcaklık)
  ['#f83600', '#f9d423'],     // Kırmızı-Turuncu → Sarı (güneş ışığı efekti)
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradientColors.length);
  return gradientColors[randomIndex];
};

const PromotionCard: React.FC<Props> = ({ item }) => {
  const navigation: any = useNavigation();
  const randomColors = useMemo(() => getRandomGradient(), []);


const parseCategories = (categoriesStr: string | undefined): string[] => {
  if (!categoriesStr) return [];
  try {
    const fixedStr = categoriesStr.replace(/'/g, '"').trim();
    return JSON.parse(fixedStr);
  } catch (error) {
    console.warn("Kategori parse hatası:", error);
    return [];
  }
};


  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        const categoriesArray = parseCategories(item.category);
        navigation.navigate('ProductsPage', {
          category: categoriesArray[2],
        });
      }}
    >
      <LinearGradient
        colors={randomColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.badge}>
          <Image style={{
            height: 60,
            width: 60,
          }} source={images.badge} />
        </View>
        <View style={styles.leftSection}>
          <Text style={[styles.brandText, typography.Body1]}>
            {item.brand === "Unknown"
              ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
              : item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}
          </Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

        <View style={styles.rightSection}>
          <Text style={[styles.ctaText, typography.Body1]}>Browse the Product</Text>
        </View>

        <View style={styles.dateTag}>
          <Text style={[styles.dateText, typography.Body3Medium]}>May 29 - June 1</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  leftSection: {
    flex: 1,
    paddingTop: 10,
  },
  badge: {
    resizeMode: "stretch",
    position: 'absolute',
    top: 0,
    left: 35,
  },
  brandText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    textAlign: "center"
  },
  imageWrapper: {
    flex: 1.2,
    marginHorizontal: 12,
    position: 'relative',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#000000aa',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  overlayText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontWeight: 700,
    textAlign: "center"
  },
  dateTag: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  dateText: {
    color: '#d81b60',
    fontWeight: 'bold',
  },
});

export default PromotionCard;
