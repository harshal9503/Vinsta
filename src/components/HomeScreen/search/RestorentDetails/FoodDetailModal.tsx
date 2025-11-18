import { Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../theme/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const FILTER_TAG_COLORS = {
    background: '#FFF9F3',
    border: '#FFE0C8',
    text: '#F99C38',
};
const FoodDetailModal = ({
    foodModalVisible,
    setFoodModalVisible,
    selectedFood,
    selectedCheese,
    toggleCheeseSelection,
    quantity,
    incrementQuantity,
    decrementQuantity,
    cookingRequest,
    setCookingRequest,
    handleAddToCart
}) => {
    return (
        <Modal
            visible={foodModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setFoodModalVisible(false)}
        >
            <View style={styles.foodModalOverlay}>
                <Pressable
                    style={styles.foodModalBackdrop}
                    onPress={() => setFoodModalVisible(false)}
                />

                {/* Close Button - Half Outside/Half Inside Modal */}
                <TouchableOpacity
                    style={styles.modalCloseBtn}
                    onPress={() => setFoodModalVisible(false)}
                    activeOpacity={0.8}
                >
                    <Image
                        source={require('../../../../assets/close.png')}
                        style={styles.modalCloseIcon}
                    />
                </TouchableOpacity>

                <View style={styles.foodModalContent}>
                    {selectedFood && (
                        <>
                            {/* Header with Image */}
                            <View style={styles.modalHeader}>
                                <Image
                                    source={selectedFood.img}
                                    style={styles.modalFoodImage}
                                />

                                {/* Rating Badge */}
                                <View style={styles.modalRatingBadge}>
                                    <Image
                                        source={require('../../../../assets/star.png')}
                                        style={styles.modalStarIcon}
                                    />
                                    <Text style={styles.modalRatingText}>4.4</Text>
                                </View>
                            </View>

                            {/* Scrollable Content */}
                            <ScrollView
                                style={styles.modalScrollContent}
                                contentContainerStyle={styles.modalScrollContentContainer}
                                showsVerticalScrollIndicator={false}
                                bounces={true}
                            >
                                {/* Veg/Non-Veg Badge and Spicy Tag */}
                                <View style={styles.modalBadgeRow}>
                                    <Image
                                        source={
                                            selectedFood.isVeg
                                                ? require('../../../../assets/veg.png')
                                                : require('../../../../assets/nonveg.png')
                                        }
                                        style={styles.modalVegBadge}
                                    />
                                    <View style={styles.modalSpicyTag}>
                                        <Image
                                            source={require('../../../../assets/spicy.png')}
                                            style={styles.modalSpicyIcon}
                                        />
                                        <Text style={styles.modalSpicyText}>Spicy</Text>
                                    </View>
                                </View>

                                {/* Food Name */}
                                <Text style={styles.modalFoodName}>{selectedFood.name}</Text>

                                {/* Restaurant Name */}
                                <Text style={styles.modalRestaurantName}>
                                    {selectedFood.restaurant}
                                </Text>

                                {/* Description */}
                                <Text style={styles.modalDescription}>
                                    {selectedFood.description}
                                </Text>

                                {/* Extra Cheese Section */}
                                <Text style={styles.modalSectionTitle}>Extra Cheese</Text>
                                <Text style={styles.modalSectionSubtitle}>
                                    Select up to 2 option
                                </Text>

                                {/* Cheese Options */}
                                <TouchableOpacity
                                    style={styles.modalOptionRow}
                                    onPress={() => toggleCheeseSelection('Single Cheese Slice')}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.modalOptionLeft}>
                                        <Image
                                            source={require('../../../../assets/veg.png')}
                                            style={styles.modalOptionVegIcon}
                                        />
                                        <Text style={styles.modalOptionText}>
                                            Single Cheese Slice
                                        </Text>
                                    </View>
                                    <View style={styles.modalOptionRight}>
                                        <Text style={styles.modalOptionPrice}>₹25.00</Text>
                                        {selectedCheese.includes('Single Cheese Slice') ? (
                                            <Image
                                                source={require('../../../../assets/tick.png')}
                                                style={styles.modalTickIcon}
                                            />
                                        ) : (
                                            <View style={styles.modalUncheckedCircle} />
                                        )}
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.modalOptionRow}
                                    onPress={() => toggleCheeseSelection('Double Cheese Slice')}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.modalOptionLeft}>
                                        <Image
                                            source={require('../../../../assets/veg.png')}
                                            style={styles.modalOptionVegIcon}
                                        />
                                        <Text style={styles.modalOptionText}>
                                            Double Cheese Slice
                                        </Text>
                                    </View>
                                    <View style={styles.modalOptionRight}>
                                        <Text style={styles.modalOptionPrice}>₹39.00</Text>
                                        {selectedCheese.includes('Double Cheese Slice') ? (
                                            <Image
                                                source={require('../../../../assets/tick.png')}
                                                style={styles.modalTickIcon}
                                            />
                                        ) : (
                                            <View style={styles.modalUncheckedCircle} />
                                        )}
                                    </View>
                                </TouchableOpacity>

                                {/* Cooking Request */}
                                <Text style={styles.modalCookingRequestTitle}>
                                    Add a cooking request (optional)
                                </Text>
                                <TextInput
                                    style={styles.modalCookingInput}
                                    placeholder="e.g. don't make it too spicy"
                                    placeholderTextColor="#999"
                                    value={cookingRequest}
                                    onChangeText={setCookingRequest}
                                    multiline
                                    numberOfLines={4}
                                />
                            </ScrollView>

                            {/* Bottom Action Bar */}
                            <View style={styles.modalBottomBar}>
                                {/* Quantity Control */}
                                <View style={styles.quantityControl}>
                                    <TouchableOpacity
                                        style={styles.quantityBtn}
                                        onPress={decrementQuantity}
                                    >
                                        <Text style={styles.quantityBtnText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.quantityBtn}
                                        onPress={incrementQuantity}
                                    >
                                        <Text style={styles.quantityBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Add to Cart Button */}
                                <TouchableOpacity
                                    style={styles.addToCartBtn}
                                    onPress={handleAddToCart}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../../assets/bag.png')}
                                        style={styles.bagIcon}
                                    />
                                    <Text style={styles.addToCartText}>ADD TO CART</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    )
}

export default FoodDetailModal

const styles = StyleSheet.create({
    foodModalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    foodModalBackdrop: {
        flex: 1,
    },
    foodModalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: wp('6%'),
        borderTopRightRadius: wp('6%'),
        height: Platform.OS === 'ios' ? hp('82%') : hp('80%'),
        paddingBottom: Platform.OS === 'ios' ? hp('2%') : 0,
    },
    modalHeader: {
        position: 'relative',
    },
    modalFoodImage: {
        width: '100%',
        height: Platform.OS === 'ios' ? hp('22%') : hp('20%'),
        borderTopLeftRadius: wp('6%'),
        borderTopRightRadius: wp('6%'),
        resizeMode: 'cover',
    },
    // Close Button - Half Outside Modal
    modalCloseBtn: {
        position: 'absolute',
        top: 115, // ⬅️ Button ko modal ke upar overlap karne ke liye
        alignSelf: 'center',

        zIndex: 999,
        backgroundColor: '#fff',
        borderRadius: wp('10%'),
        padding: wp('2%'),
        width: wp('12%'),
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 10, // Android shadow
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },

    modalCloseIcon: {
        width: wp('8%'),
        height: wp('8%'),
        tintColor: COLORS.primary,
        resizeMode: 'contain',
    },
    modalRatingBadge: {
        position: 'absolute',
        bottom: hp('1.5%'),
        right: wp('5%'),
        backgroundColor: COLORS.primary,
        borderRadius: wp('2.5%'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('0.6%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalStarIcon: {
        width: wp('3.2%'),
        height: wp('3.2%'),
        tintColor: '#fff',
        marginRight: wp('1%'),
        resizeMode: 'contain',
    },
    modalRatingText: {
        color: '#fff',
        fontSize: hp('1.5%'),
        fontWeight: '700',
    },
    modalScrollContent: {
        flex: 1,
        marginTop: wp('2%'),
    },
    modalScrollContentContainer: {
        paddingHorizontal: wp('5%'),
        paddingTop: hp('1%'),
        paddingBottom: hp('3%'),
    },
    modalBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    modalVegBadge: {
        width: wp('4.5%'),
        height: wp('4.5%'),
        marginRight: wp('2%'),
        resizeMode: 'contain',
    },
    modalSpicyTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: FILTER_TAG_COLORS.background,
        borderColor: FILTER_TAG_COLORS.border,
        borderWidth: 1,
        borderRadius: wp('2%'),
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('0.5%'),
    },
    modalSpicyIcon: {
        width: wp('3%'),
        height: wp('3%'),
        marginRight: wp('1%'),
        resizeMode: 'contain',
    },
    modalSpicyText: {
        color: FILTER_TAG_COLORS.text,
        fontSize: hp('1.4%'),
        fontWeight: '600',
    },
    modalFoodName: {
        fontSize: hp('2.4%'),
        fontWeight: '700',
        color: '#000',
        marginBottom: hp('0.5%'),
        lineHeight: hp('2.8%'),
    },
    modalRestaurantName: {
        fontSize: hp('1.6%'),
        fontWeight: '500',
        color: '#666',
        marginBottom: hp('1.2%'),
    },
    modalDescription: {
        fontSize: hp('1.6%'),
        fontWeight: '400',
        color: '#555',
        lineHeight: hp('2.3%'),
        marginBottom: hp('2%'),
    },
    modalSectionTitle: {
        fontSize: hp('1.9%'),
        fontWeight: '700',
        color: '#000',
        marginBottom: hp('0.4%'),
        marginTop: hp('0.5%'),
    },
    modalSectionSubtitle: {
        fontSize: hp('1.5%'),
        fontWeight: '400',
        color: '#888',
        marginBottom: hp('1.2%'),
    },
    modalOptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('1.6%'),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalOptionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    modalOptionVegIcon: {
        width: wp('4%'),
        height: wp('4%'),
        marginRight: wp('2.5%'),
        resizeMode: 'contain',
    },
    modalOptionText: {
        fontSize: hp('1.65%'),
        fontWeight: '600',
        color: '#000',
    },
    modalOptionRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOptionPrice: {
        fontSize: hp('1.65%'),
        fontWeight: '700',
        color: '#000',
        marginRight: wp('3%'),
    },
    modalTickIcon: {
        width: wp('5%'),
        height: wp('5%'),
        resizeMode: 'contain',
    },
    modalUncheckedCircle: {
        width: wp('5%'),
        height: wp('5%'),
        borderRadius: wp('2.5%'),
        borderWidth: 2,
        borderColor: '#CCC',
    },
    modalCookingRequestTitle: {
        fontSize: hp('1.7%'),
        fontWeight: '600',
        color: '#000',
        marginTop: hp('2%'),
        marginBottom: hp('1%'),
    },
    modalCookingInput: {
        backgroundColor: '#F8F8F8',
        borderRadius: wp('3%'),
        borderWidth: 1,
        borderColor: '#E8E8E8',
        paddingHorizontal: wp('4%'),
        paddingVertical: Platform.OS === 'ios' ? hp('1.5%') : hp('1.2%'),
        fontSize: hp('1.55%'),
        color: '#000',
        height: Platform.OS === 'ios' ? hp('10%') : hp('11%'),
        textAlignVertical: 'top',
    },
    modalBottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
        paddingVertical: Platform.OS === 'ios' ? hp('1.8%') : hp('2%'),
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#fff',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9F3',
        borderColor: '#FFE0C8',
        borderWidth: 1.5,
        borderRadius: wp('3%'),
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
    },
    quantityBtn: {
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.2%'),
    },
    quantityBtnText: {
        fontSize: hp('2.8%'),
        fontWeight: '700',
        color: COLORS.primary,
    },
    quantityText: {
        fontSize: hp('2.1%'),
        fontWeight: '700',
        color: '#000',
        marginHorizontal: wp('4%'),
        minWidth: wp('7%'),
        textAlign: 'center',
    },
    addToCartBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: wp('3%'),
        paddingVertical: Platform.OS === 'ios' ? hp('1.8%') : hp('1.9%'),
        marginLeft: wp('4%'),
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bagIcon: {
        width: wp('5%'),
        height: wp('5%'),
        tintColor: '#fff',
        marginRight: wp('2%'),
        resizeMode: 'contain',
    },
    addToCartText: {
        fontSize: hp('1.85%'),
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
})