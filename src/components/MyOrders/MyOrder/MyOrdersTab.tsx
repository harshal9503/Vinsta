import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import UpcomingOrders from './UpcomingOrders';
import PastOrders from './PastOrders';
import { ThemeContext } from '../../../theme/ThemeContext';
const MyOrdersTab = ({
    orderTab,
    setOrderTab,
    upcomingOrders,
    pastOrders,
    navigation,
    navigateToOrderDetail,
    setRatingModal,
}) => {
    const { theme, isDarkMode } = useContext(ThemeContext);
    return (
        <>
            {/* SUB TABS CONTAINER */}
            <View style={[
                styles.tabRowOuter,
                { backgroundColor: 'transparent' }
            ]}>
                <View
                    style={[
                        styles.tabRow,
                        {
                            backgroundColor: theme.cardBackground,
                            borderColor: isDarkMode ? theme.borderColor : 'transparent',
                            borderWidth: isDarkMode ? 1 : 0,
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            orderTab === 'Upcoming' && styles.activeTab,
                            orderTab === 'Upcoming' && styles.activeTabSides,
                        ]}
                        onPress={() => setOrderTab('Upcoming')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: isDarkMode ? theme.text : theme.text },
                                orderTab === 'Upcoming' && { color: '#fff' },
                            ]}
                        >
                            Upcoming Order
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            orderTab === 'Past' && styles.activeTab,
                            orderTab === 'Past' && styles.activeTabSides,
                        ]}
                        onPress={() => setOrderTab('Past')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: isDarkMode ? theme.text : theme.text },
                                orderTab === 'Past' && { color: '#fff' },
                            ]}
                        >
                            Past Orders
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ORDERS */}
            {orderTab === 'Upcoming'
                ? upcomingOrders.map((o) => (
                    <UpcomingOrders key={o.id} order={o} />
                ))
                : pastOrders.map((o) => (
                    <PastOrders
                        key={o.id}
                        order={o}
                        navigateToOrderDetail={navigateToOrderDetail}
                        openRatingModal={() => setRatingModal(true)}
                    />
                ))}
        </>
    );
};

export default MyOrdersTab;

const styles = StyleSheet.create({
    tabRowOuter: {
        marginHorizontal: 20,
        marginBottom: 14,
        backgroundColor: 'transparent',
        borderRadius: 10,
        elevation: 0,
        marginTop: 20,
    },
    tabRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'transparent',
    },
    activeTab: {
        backgroundColor: COLORS.primary,
        elevation: 0,
    },
    activeTabText: { color: '#fff' },
    activeTabSides: {
        borderRadius: 10,
    },
    tabText: {
        fontSize: 14,
        color: '#000',
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
});
