import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    PanResponder,
    Alert,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { launchImageLibrary, MediaType, ImagePickerResponse, Asset, ImageLibraryOptions } from 'react-native-image-picker';
import ViewShot from "react-native-view-shot";
import CommonHeader from '../../navigation/Header/CommonHeader';
import { images } from '../../assets/assets';
import colors from '../../assets/colors';
import Share from 'react-native-share';
import { usePurchase } from './TshirtContext';

//https://purepng.com/public/uploads/large/white-tshirt-n0j.png tshirt url

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TShirtCustomizer = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imagePosition, setImagePosition] = useState({ x: 100, y: 150 });
    const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
    const [imageRotation, setImageRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const viewShotRef = useRef<ViewShot>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const { buyProduct } = usePurchase();
    const [initialDistance, setInitialDistance] = useState(0);
    const [initialAngle, setInitialAngle] = useState(0);
    const [gestureStartAngle, setGestureStartAngle] = useState(0);

    const tshirtDimensions = {
        width: screenWidth,
        height: screenHeight * 0.7,
        x: 0,
        y: 0,
    };

    const pickImage = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo' as MediaType,
            quality: 0.8 as any,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: false,
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User canceled photo selection');
                return;
            }

            if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                Alert.alert('Error', 'An error occurred while selecting the photo.');
                return;
            }

            if (response.assets && response.assets[0]) {
                const asset: Asset = response.assets[0];
                setSelectedImage(asset.uri || null);
                setImagePosition({
                    x: 90,
                    y: 120,
                });
                setImageSize({ width: 70, height: 70 });
                setImageRotation(0);
            }
        });
    };

    const getDistance = (touch1: any, touch2: any) => {
        const dx = touch1.pageX - touch2.pageX;
        const dy = touch1.pageY - touch2.pageY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const getAngle = (touch1: any, touch2: any) => {
        const dx = touch1.pageX - touch2.pageX;
        const dy = touch1.pageY - touch2.pageY;
        return Math.atan2(dy, dx) * 180 / Math.PI;
    };

    const normalizeAngle = (angle: number) => {
        while (angle < 0) angle += 360;
        while (angle >= 360) angle -= 360;
        return angle;
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: (evt) => {
                if (evt.nativeEvent.touches.length === 1) {
                    setIsDragging(true);
                } else if (evt.nativeEvent.touches.length === 2) {
                    setIsRotating(true);
                    const touch1 = evt.nativeEvent.touches[0];
                    const touch2 = evt.nativeEvent.touches[1];

                    setInitialDistance(getDistance(touch1, touch2));
                    setInitialAngle(getAngle(touch1, touch2));
                    setGestureStartAngle(imageRotation);
                }
            },

            onPanResponderMove: (evt, gestureState) => {
                if (evt.nativeEvent.touches.length === 1 && !isResizing && !isRotating) {
                    const paddingLeft = screenWidth * 0.25;
                    const paddingRight = screenWidth * 0.18;
                    const paddingTop = screenHeight * 0.18;
                    const paddingBottom = screenHeight * 0.07;

                    const newX = Math.max(
                        paddingLeft,
                        Math.min(
                            tshirtDimensions.width - imageSize.width - paddingRight,
                            imagePosition.x + gestureState.dx
                        )
                    );

                    const newY = Math.max(
                        paddingTop,
                        Math.min(
                            tshirtDimensions.height - imageSize.height - paddingBottom,
                            imagePosition.y + gestureState.dy
                        )
                    );

                    setImagePosition({ x: newX, y: newY });
                } else if (evt.nativeEvent.touches.length === 2 && isRotating) {
                    const touch1 = evt.nativeEvent.touches[0];
                    const touch2 = evt.nativeEvent.touches[1];

                    const currentAngle = getAngle(touch1, touch2);
                    const angleDifference = currentAngle - initialAngle;
                    const newRotation = normalizeAngle(gestureStartAngle + angleDifference);

                    setImageRotation(newRotation);
                }
            },

            onPanResponderRelease: () => {
                setIsDragging(false);
                setIsRotating(false);
            },
        })
    ).current;

    const resizeResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                setIsResizing(true);
            },

            onPanResponderMove: (evt, gestureState) => {
                const newWidth = Math.max(
                    30,
                    Math.min(
                        200,
                        Math.min(
                            tshirtDimensions.width - imagePosition.x - 10,
                            imageSize.width + gestureState.dx
                        )
                    )
                );
                const newHeight = Math.max(
                    30,
                    Math.min(
                        200,
                        Math.min(
                            tshirtDimensions.height - imagePosition.y - 10,
                            imageSize.height + gestureState.dy
                        )
                    )
                );

                setImageSize({ width: newWidth, height: newHeight });
            },

            onPanResponderRelease: () => {
                setIsResizing(false);
            },
        })
    ).current;

    const removeImage = () => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setSelectedImage(null);
                        setImageRotation(0);
                    }
                },
            ]
        );
    };

    const handleShare = async () => {
        try {
            setIsSharing(true);
            setIsCapturing(true);

            if (viewShotRef.current && typeof viewShotRef.current.capture === "function") {
                const uri = await viewShotRef.current.capture();
                const shareOptions = {
                    title: "My Custom T-Shirt",
                    message: "Check out my T-shirt design! 🎨👕",
                    url: uri,
                };
                await Share.open(shareOptions);
            } else {
                Alert.alert("Error", "Unable to capture the image.");
            }
        } catch (error) {
            console.error("Error during sharing:", error);
            Alert.alert("Error", "An error occurred while sharing the image.");
        } finally {
            setIsSharing(false);
            setIsCapturing(false);
        }
    };

    const handleBuyFromImage = async () => {
        try {
            setIsCapturing(true);
            let uri = "";

            if (viewShotRef.current && typeof viewShotRef.current.capture === "function") {
                uri = await viewShotRef.current.capture();
            } else {
                Alert.alert("Error", "Unable to capture the image.");
                return;
            }

            const newPurchase = {
                id: Date.now().toString(),
                name: "Custom T-Shirt Design",
                image: { uri },
                price: 149.99,
            };

            buyProduct(newPurchase);
            Alert.alert("Success", "Your custom T-shirt has been added to purchases!");
        } catch (e) {
            console.error("Failed to buy from image:", e);
            Alert.alert("Error", "Could not complete purchase.");
        } finally {
            setIsCapturing(false); 
        }
    };

    const hideControls = isSharing || isCapturing;

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader title='T-shirt Customization' page='goBack' icon={images.shareIcon} onPress={handleShare} />
            <ViewShot style={styles.tshirtContainer} ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
                <View>
                    <View
                        style={[
                            styles.tshirt,
                            {
                                width: tshirtDimensions.width,
                                height: tshirtDimensions.height,
                                left: tshirtDimensions.x,
                                top: tshirtDimensions.y,
                            },
                        ]}
                    >
                        <Image
                            source={images.tshirt}
                            style={styles.tshirtBackgroundImage}
                            resizeMode="contain"
                        />

                        {selectedImage && (
                            <View
                                style={[
                                    styles.imageContainer,
                                    {
                                        left: imagePosition.x,
                                        top: imagePosition.y,
                                        width: imageSize.width,
                                        height: imageSize.height,
                                        borderColor: (isDragging || isRotating) ? '#ff4444' : '#ff6b6b',
                                        opacity: (isDragging || isRotating) ? 0.8 : 1,
                                        elevation: (isDragging || isRotating) ? 8 : 4,
                                        shadowOpacity: (isDragging || isRotating) ? 0.3 : 0.2,
                                        borderWidth: hideControls ? 0 : 2,
                                        transform: [{ rotate: `${imageRotation}deg` }],
                                    },
                                ]}
                                {...panResponder.panHandlers}
                            >
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={styles.overlayImage}
                                    resizeMode="cover"
                                />

                                {!hideControls && (
                                    <>
                                        <View
                                            style={[
                                                styles.resizeHandle,
                                                { backgroundColor: isResizing ? '#ff4444' : '#ff6b6b' }
                                            ]}
                                            {...resizeResponder.panHandlers}
                                        >
                                            <View style={styles.resizeIcon} />
                                            <View style={[styles.resizeIcon, { marginLeft: 2 }]} />
                                        </View>

                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={removeImage}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.deleteText}>×</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}

                        {!selectedImage && (
                            <View style={styles.emptyState}>
                                <Image source={images.tshirtEmpty} style={styles.emptyStateIcon} />
                                <Text style={styles.emptyStateText}>Add Your Design</Text>
                                <Text style={styles.emptyStateSubText}>
                                    You can add a photo by {'\n'}tapping the button below
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ViewShot>

            {!hideControls && (
                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={pickImage}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>📷 Add Photo</Text>
                    </TouchableOpacity>

                    {selectedImage && (
                        <>
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={handleBuyFromImage}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.secondaryButtonText}>Buy</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    tshirtContainer: {
        flex: 1,
        position: 'relative',
    },
    tshirt: {
        position: 'absolute',
    },
    tshirtBackgroundImage: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        position: 'absolute',
        borderStyle: 'dashed',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    overlayImage: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    resizeHandle: {
        position: 'absolute',
        bottom: -8,
        right: -8,
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resizeIcon: {
        width: 2,
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
    deleteButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ff4444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyState: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateIcon: {
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptyStateSubText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    controls: {
        padding: 20,
        backgroundColor: '#fff',
    },
    primaryButton: {
        backgroundColor: colors.orange,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#5FCC5F',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    instructionText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 8,
    },
});

export default TShirtCustomizer;