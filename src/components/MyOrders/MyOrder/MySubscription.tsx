import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { COLORS } from '../../../theme/colors';
import { getFontFamily, getFontWeight } from '../../../utils/fontHelper';
import ActiveOrders from './ActiveOrders';
import PreviousOrder from './PreviousOrder';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../theme/ThemeContext';

const MySubscription = ({
    subTab,
    setSubTab,
    activeSubs,
    previousSubs,
    setRatingModal,
}) => {

    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();

    return (
        <View
            style={{
                backgroundColor: theme.background,
                flex: 1,
            }}
        >
            {/* Tabs */}
            <View style={styles.tabRowOuter}>
                <View
                    style={[
                        styles.tabRow,
                        { backgroundColor: theme.card, borderColor: theme.cardBackground }
                    ]}
                >
                    {/* Active Tab */}
                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            subTab === 'Active' && {
                                backgroundColor: COLORS.primary,
                                borderRadius: 10,
                            }
                        ]}
                        onPress={() => setSubTab('Active')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: theme.text },
                                subTab === 'Active' && { color: '#FFF' }
                            ]}
                        >
                            Active
                        </Text>
                    </TouchableOpacity>

                    {/* Previous Tab */}
                    <TouchableOpacity
                        style={[
                            styles.tabBtn,
                            subTab === 'Previous' && {
                                backgroundColor: COLORS.primary,
                                borderRadius: 10,
                            }
                        ]}
                        onPress={() => setSubTab('Previous')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: theme.text },
                                subTab === 'Previous' && { color: '#FFF' }
                            ]}
                        >
                            Previous
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Header */}
            <View style={styles.activeHeader}>
                <Image
  source={require('../../../assets/p1.png')}
  style={[
    styles.plusIcon,
    {
      tintColor: theme.mode === 'dark' ? '#cbc9c9ff' : '#5b5b5bff',
    },
  ]}
/>

                <Text
                    style={[
                        styles.activeTitle,
                        { color: theme.text }
                    ]}
                >
                    {subTab === 'Active'
                        ? "My active subscription's"
                        : "Previous subscription's"}
                </Text>
            </View>

            {/* Subscription Cards */}
            {(subTab === 'Active' ? activeSubs : previousSubs).map((s) => (
                <View
                    key={s.id}
                    style={[
                        styles.subCard,
                        {
                            backgroundColor: theme.card,
                            borderColor: theme.cardBackground,
                            borderWidth: 1
                        }
                    ]}
                >
                    <ActiveOrders
                        sub={s}
                        isPrevious={false}
                        openRatingModal={() => setRatingModal(true)}
                    />

                    {subTab === 'Previous' && (
                        <PreviousOrder
                            onRatePress={() => setRatingModal(true)}
                            onResubscribePress={() =>
                                navigation.navigate('ReSubscribeScreen')
                            }
                        />
                    )}
                </View>
            ))}

            {/* Bottom Note */}
            {subTab === 'Active' && (
                <View style={styles.bottomNoteRow}>
                    <Text
                        style={[
                            styles.cancelNote,
                            { color: theme.mode === 'dark' ? '#FF5555' : '#EA001B' }
                        ]}
                    >
                        Subscription plan cannot be cancelled
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('AddMoreSubscription')
                        }
                    >
                        <Text
                            style={[
                                styles.addText,
                                { color: theme.mode === 'dark' ? '#00D46E' : '#259E29' }
                            ]}
                        >
                            + Add More
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default MySubscription;

const styles = StyleSheet.create({
    tabRowOuter: {
        marginHorizontal: 20,
        marginBottom: 14,
        marginTop: 20,
    },
    tabRow: {
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
    },
    tabText: {
        fontSize: 14,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },

    activeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    plusIcon: { width: 20, height: 20 },
    activeTitle: {
        marginLeft: 8,
        fontSize: 16,
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },

    subCard: {
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 14,
        padding: 14,
    },

    bottomNoteRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
    },
    cancelNote: {
        fontSize: 13,
        fontFamily: getFontFamily('Medium'),
        fontWeight: getFontWeight('Medium'),
    },
    addText: {
        fontSize: 13,
        fontFamily: getFontFamily('Bold'),
        fontWeight: getFontWeight('Bold'),
    },
});
