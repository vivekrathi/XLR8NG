import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Deal} from '../shared/types';
import {MockApiService} from '../shared/api';
import DealCard from '../components/DealCard';
import DealGrid from '../components/DealGrid';

const HomeScreen = ({navigation}: any) => {
  const [superDeals, setSuperDeals] = useState<Deal[]>([]);
  const [latestDeals, setLatestDeals] = useState<Deal[]>([]);
  const [priceDrops, setPriceDrops] = useState<Deal[]>([]);
  const [eventOffers, setEventOffers] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Deal[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [superDealsRes, latestDealsRes, priceDropsRes, eventOffersRes] =
        await Promise.all([
          MockApiService.getSuperDeals(1, 6),
          MockApiService.getLatestDeals(1, 6),
          MockApiService.getPriceDrops(1, 6),
          MockApiService.getEventOffers(1, 6),
        ]);

      setSuperDeals(superDealsRes.deals);
      setLatestDeals(latestDealsRes.deals);
      setPriceDrops(priceDropsRes.deals);
      setEventOffers(eventOffersRes.deals);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await MockApiService.searchDeals({query: searchQuery});
      setSearchResults(response.deals);
    } catch (error) {
      console.error('Error searching deals:', error);
    }
  };

  const handleDealPress = (deal: Deal) => {
    navigation.navigate('DealDetail', {deal});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ TheDealApp</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Discover Amazing Deals & Save Big! 💰
          </Text>
          <Text style={styles.heroSubtitle}>
            Find the best discounts from top retailers in India
          </Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for deals, products, brands..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10,000+</Text>
            <Text style={styles.statLabel}>Active Deals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Partner Stores</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>90%</Text>
            <Text style={styles.statLabel}>Max Savings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Happy Users</Text>
          </View>
        </View>

        {isSearching ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Search Results ({searchResults.length} deals found)
            </Text>
            <DealGrid
              deals={searchResults}
              onDealPress={handleDealPress}
              emptyMessage="No deals found for your search"
            />
          </View>
        ) : (
          <>
            {/* Super Deals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔥 Super Deals - Up to 90% Off</Text>
              <DealGrid
                deals={superDeals}
                loading={loading}
                onDealPress={handleDealPress}
              />
            </View>

            {/* Latest Deals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📈 Latest Deals</Text>
              <DealGrid
                deals={latestDeals}
                loading={loading}
                onDealPress={handleDealPress}
              />
            </View>

            {/* Price Drops */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💸 Recent Price Drops</Text>
              <DealGrid
                deals={priceDrops}
                loading={loading}
                onDealPress={handleDealPress}
              />
            </View>

            {/* Events & Offers */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🎉 Events & Offers</Text>
              <DealGrid
                deals={eventOffers}
                loading={loading}
                onDealPress={handleDealPress}
              />
            </View>
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
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#007bff',
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#f8f9fa',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 12,
    minWidth: 48,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;