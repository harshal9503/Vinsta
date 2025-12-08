import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../theme/colors';
import { vibrate } from '../../../utils/vibrationHelper';

const { width } = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';
const isTablet = width >= 768;

// Helper functions
const scaleSize = (size: number) => {
  if (isIOS) {
    return isTablet ? size * 0.9 : size * 1.02;
  }
  return size;
};

interface ViewCartCardProps {
  cartItemsCount: number;
  cartTotal: number;
}

const ViewCartCard: React.FC<ViewCartCardProps> = ({
  cartItemsCount = 4,
  cartTotal = 234.5,
}) => {
  const navigation = useNavigation();

  const handleViewCartPress = () => {
    vibrate(40);
    navigation.navigate('Cart' as never);
  };

  return (
    <TouchableOpacity
      style={styles.viewCartCard}
      activeOpacity={0.8}
      onPress={handleViewCartPress}
    >
      <View style={styles.viewCartContent}>
        {/* Left side - Overlapping product images */}
        <View style={styles.imagesContainer}>
          <View style={styles.imageStack}>
            <Image
              source={require('../../../assets/b1.png')}
              style={[styles.productImage, styles.imageFirst]}
            />
            <Image
              source={require('../../../assets/b2.png')}
              style={[styles.productImage, styles.imageSecond]}
            />
            <Image
              source={require('../../../assets/b3.png')}
              style={[styles.productImage, styles.imageThird]}
            />
          </View>
        </View>

        {/* Center - View Cart text and item count */}
        <View style={styles.centerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.viewCartTitle}>View Cart</Text>
            <Text style={styles.viewCartItems}>{cartItemsCount}+ items</Text>
          </View>
        </View>

        {/* Right side - Arrow with transparent gray background */}
        <View style={styles.rightContent}>
          <View style={styles.arrowContainer}>
            <Image
              source={require('../../../assets/rightarrow.png')}
              style={styles.viewCartArrow}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewCartCard: {
    position: 'absolute',
    bottom: isIOS ? 5 : 10,
    alignSelf: 'center', // Center the card horizontally
    backgroundColor: COLORS.primary,
    borderRadius: scaleSize(25),
    paddingVertical: 8, // Reduced from 12
    paddingHorizontal: 12, // Reduced from 16
    zIndex: 1000,
    width: width * 0.5, // Make it half the screen width
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  viewCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 38, // Reduced from 40
  },
  imagesContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
  imageStack: {
    position: 'relative',
    width: 45, // Reduced from 60
    height: 24, // Reduced from 32
    justifyContent: 'center',
  },
  productImage: {
    width: 30, // Reduced from 32
    height: 28, // Reduced from 32
    borderRadius: 15, // Adjusted for new size
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
  },
  imageFirst: {
    zIndex: 3,
    left: 0,
  },
  imageSecond: {
    zIndex: 2,
    left: 7, // Reduced from 10
  },
  imageThird: {
    zIndex: 1,
    left: 14, // Reduced from 20
  },
  centerContent: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCartTitle: {
    fontFamily: 'Figtree-Bold',
    fontSize: 14, // Reduced from 16
    color: '#FFFFFF',
    lineHeight: 16, // Reduced from 20
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: 1, // Reduced from 2
  },
  viewCartItems: {
    fontFamily: 'Figtree-Medium',
    fontSize: 10, // Reduced from 12
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 12, // Reduced from 14
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  rightContent: {
    flex: 0.2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 24, // Reduced from 32
    height: 24, // Reduced from 32
    borderRadius: 12, // Adjusted for new size
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCartArrow: {
    width: scaleSize(5), // Reduced from 6
    height: scaleSize(9), // Reduced from 11
    tintColor: '#FFFFFF',
  },
});

export default ViewCartCard;
