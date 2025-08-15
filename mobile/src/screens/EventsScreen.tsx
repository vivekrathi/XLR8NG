import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Deal} from '../shared/types';
import {MockApiService} from '../shared/api';
import DealCard from '../components/DealCard';

const EventsScreen = ({navigation}: any) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const response = await MockApiService.getEventOffers(1, 30);
      setDeals(response.deals);
    } catch (error) {
      console.error('Error loading event offers:', error);
    } finally {
      setLoading(false);
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
        <Text style={styles.headerTitle}>🎉 Events & Special Offers</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Special event deals, festival offers, and seasonal discounts - minimum 50% off!
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading deals...</Text>
          </View>
        ) : (
          renderDealCards()
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
});

export default EventsScreen;