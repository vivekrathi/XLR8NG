import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {Deal} from '../shared/types';
import {formatPrice, formatDiscountPercentage, truncateText} from '../shared/utils';

interface DealCardProps {
  deal: Deal;
  onPress?: (deal: Deal) => void;
  onGetDeal?: (deal: Deal) => void;
}

const DealCard: React.FC<DealCardProps> = ({deal, onPress, onGetDeal}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(deal);
    }
  };

  const handleGetDeal = () => {
    if (onGetDeal) {
      onGetDeal(deal);
    } else {
      Linking.openURL(deal.productUrl);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Discount Badge */}
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>
          {formatDiscountPercentage(deal.discountPercentage)}
        </Text>
      </View>

      {/* Retailer Badge */}
      <View
        style={[
          styles.retailerBadge,
          {backgroundColor: deal.retailer.primaryColor},
        ]}>
        <Text style={styles.retailerText}>{deal.retailer.name}</Text>
      </View>

      {/* Product Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>📦</Text>
      </View>

      {/* Deal Info */}
      <View style={styles.dealInfo}>
        <Text style={styles.dealTitle} numberOfLines={2}>
          {truncateText(deal.title, 60)}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>
            {formatPrice(deal.discountedPrice)}
          </Text>
          <Text style={styles.originalPrice}>
            {formatPrice(deal.originalPrice)}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          <Text style={styles.categoryTag}>{deal.category.name}</Text>
          {deal.isFeatured && (
            <Text style={styles.featuredTag}>Featured</Text>
          )}
        </View>

        <TouchableOpacity style={styles.getDealButton} onPress={handleGetDeal}>
          <Text style={styles.getDealButtonText}>GET DEAL</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
    width: 280,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#dc3545',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  retailerBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  retailerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 12,
  },
  imagePlaceholderText: {
    fontSize: 48,
  },
  dealInfo: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    minHeight: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#e9ecef',
    color: '#495057',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    marginRight: 8,
  },
  featuredTag: {
    backgroundColor: '#ffc107',
    color: '#212529',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: '600',
  },
  getDealButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  getDealButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DealCard;