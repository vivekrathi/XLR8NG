import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Deal} from '../shared/types';
import {formatPrice, formatDiscountPercentage, calculateSavings, formatSavings} from '../shared/utils';

interface DealDetailScreenProps {
  route: {
    params: {
      deal: Deal;
    };
  };
  navigation: any;
}

const DealDetailScreen: React.FC<DealDetailScreenProps> = ({route, navigation}) => {
  const {deal} = route.params;

  const handleGetDeal = () => {
    Linking.openURL(deal.productUrl);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deal Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Deal Image Placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📦</Text>
          </View>
          
          {/* Discount Badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {formatDiscountPercentage(deal.discountPercentage)}
            </Text>
          </View>
        </View>

        {/* Deal Information */}
        <View style={styles.dealInfo}>
          <Text style={styles.dealTitle}>{deal.title}</Text>
          <Text style={styles.dealDescription}>{deal.description}</Text>

          {/* Retailer Info */}
          <View style={[styles.retailerContainer, {backgroundColor: deal.retailer.primaryColor}]}>
            <Text style={styles.retailerText}>Available at {deal.retailer.name}</Text>
          </View>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Text style={styles.discountedPrice}>{formatPrice(deal.discountedPrice)}</Text>
            <Text style={styles.originalPrice}>{formatPrice(deal.originalPrice)}</Text>
          </View>

          <Text style={styles.savingsText}>
            {formatSavings(deal.originalPrice, deal.discountedPrice)}
          </Text>

          {/* Category and Tags */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <Text style={styles.categoryValue}>{deal.category.icon} {deal.category.name}</Text>
          </View>

          {deal.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsLabel}>Tags:</Text>
              <View style={styles.tagsList}>
                {deal.tags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>{tag}</Text>
                ))}
              </View>
            </View>
          )}

          {deal.isFeatured && (
            <View style={styles.featuredContainer}>
              <Text style={styles.featuredText}>⭐ Featured Deal</Text>
            </View>
          )}

          {/* Timestamps */}
          <View style={styles.timestampContainer}>
            <Text style={styles.timestampText}>
              Added: {deal.createdAt.toLocaleDateString()}
            </Text>
            {deal.expiresAt && (
              <Text style={styles.expiryText}>
                Expires: {deal.expiresAt.toLocaleDateString()}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Get Deal Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.getDealButton} onPress={handleGetDeal}>
          <Text style={styles.getDealButtonText}>GET DEAL NOW</Text>
          <Text style={styles.getDealSubtext}>Visit {deal.retailer.name}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 16,
  },
  backButton: {
    flex: 1,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 2,
  },
  placeholder: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    margin: 16,
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagePlaceholderText: {
    fontSize: 80,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#dc3545',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dealInfo: {
    padding: 16,
  },
  dealTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dealDescription: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    marginBottom: 16,
  },
  retailerContainer: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  retailerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountedPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#28a745',
    marginRight: 16,
  },
  originalPrice: {
    fontSize: 20,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  savingsText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  categoryValue: {
    fontSize: 16,
    color: '#6c757d',
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e9ecef',
    color: '#495057',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  featuredContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  featuredText: {
    fontSize: 16,
    color: '#856404',
    fontWeight: '600',
    textAlign: 'center',
  },
  timestampContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  timestampText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  expiryText: {
    fontSize: 14,
    color: '#dc3545',
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  getDealButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  getDealButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  getDealSubtext: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
});

export default DealDetailScreen;