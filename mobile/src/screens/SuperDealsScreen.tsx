import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Deal, FilterOptions} from '../shared/types';
import {MockApiService} from '../shared/api';
import DealCard from '../components/DealCard';

const SuperDealsScreen = ({navigation}: any) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await MockApiService.getSuperDeals(pageNum, 20);

      if (pageNum === 1) {
        setDeals(response.deals);
      } else {
        setDeals(prev => [...prev, ...response.deals]);
      }

      setHasMore(response.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading super deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadDeals(page + 1);
    }
  };

  const handleDealPress = (deal: Deal) => {
    navigation.navigate('DealDetail', {deal});
  };

  const renderDealCards = () => {
    const rows = [];
    for (let i = 0; i < deals.length; i += 2) {
      const row = (
        <View key={i} style={styles.dealRow}>
          <View style={styles.dealCardContainer}>
            <DealCard
              deal={deals[i]}
              onPress={handleDealPress}
            />
          </View>
          {deals[i + 1] && (
            <View style={styles.dealCardContainer}>
              <DealCard
                deal={deals[i + 1]}
                onPress={handleDealPress}
              />
            </View>
          )}
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 Super Deals</Text>
        <Text style={styles.headerSubtitle}>Minimum 70% Off</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Handpicked deals with massive discounts from your favorite brands
        </Text>

        {loading && page === 1 ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading deals...</Text>
          </View>
        ) : (
          <>
            {renderDealCards()}

            {hasMore && !loading && deals.length > 0 && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}>
                <Text style={styles.loadMoreText}>Load More Deals</Text>
              </TouchableOpacity>
            )}

            {loading && page > 1 && (
              <View style={styles.loadingMore}>
                <Text style={styles.loadingText}>Loading more deals...</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#f8f9fa',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    padding: 16,
    marginBottom: 8,
  },
  dealRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  dealCardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  loadingContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  loadMoreButton: {
    backgroundColor: '#007bff',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadMoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingMore: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default SuperDealsScreen;