import React, { useState, useRef, useEffect } from "react";
import {
    Animated,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Easing,
    Image,
} from "react-native";
import { images } from "../assets/assets";
import Colors from "../assets/colors";

type ExpandableSectionProps = {
    title: string;
    children: React.ReactNode;
    initialExpanded?: boolean;
};

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    title,
    children,
    initialExpanded = false,
}) => {
    const [expanded, setExpanded] = useState(initialExpanded);
    const animation = useRef(new Animated.Value(initialExpanded ? 1 : 0)).current;
    const [contentHeight, setContentHeight] = useState(0);

    const toggleExpand = () => {
        const toValue = expanded ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false, 
        }).start();

        setExpanded(!expanded);
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
    });

    const opacityInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggleExpand}
                style={styles.titleContainer}
            >
                <Text style={styles.title}>{title}</Text>
                <Image
                    source={images.rightArrow}
                />
            </TouchableOpacity>

            <Animated.View
                style={[styles.body, { height: heightInterpolate, opacity: opacityInterpolate }]}
            >
                <View
                    onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: 0 }}
                >
                    {children}
                </View>
                <View style={{ paddingTop: 0 }}>{children}</View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: "hidden",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        color: "#222",
    },
    body: {
        overflow: "hidden",
        marginHorizontal: 20,
    },
});

export default ExpandableSection;
