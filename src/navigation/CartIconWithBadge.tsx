import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { images } from '../assets/assets';
import Colors from '../assets/colors';
import { useCart } from '../components/Cart/CartContext';

type CartIconWithBadgeProps = {
    focused: boolean;
};

const CartIconWithBadge: React.FC<CartIconWithBadgeProps> = ({ focused }) => {
    const { cartItems } = useCart();
    const itemCount = cartItems.length;

    const iconColor = focused ? '#000' : '#888';

    return (
        <View style={{ width: 24, height: 24 }}>
            <Image
                source={images.cartIcon}
                style={{ width: 24, height: 24, tintColor: iconColor }}
                resizeMode="contain"
            />
            {itemCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {itemCount > 99 ? '99+' : itemCount}
                    </Text>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'orange',
        borderRadius: 8,
        paddingHorizontal: 5,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default CartIconWithBadge;
