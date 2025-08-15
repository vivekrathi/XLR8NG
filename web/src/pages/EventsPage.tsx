import React, { useState, useEffect } from 'react';
import { Deal, FilterOptions } from '../shared/types';
import { MockApiService } from '../shared/api';
import { Container, Typography } from '../styles/components';
import FilterBar from '../components/deals/FilterBar';
import DealGrid from '../components/deals/DealGrid';

const EventsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({ minDiscount: 50 });

  useEffect(() => {
    loadDeals();
  }, [filters]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const response = await MockApiService.getEventOffers(1, 40);
      setDeals(response.deals);
    } catch (error) {
      console.error('Error loading event offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters({ ...newFilters, minDiscount: Math.max(newFilters.minDiscount || 0, 50) });
  };

  const handleResetFilters = () => {
    setFilters({ minDiscount: 50 });
  };

  const handleDealClick = (deal: Deal) => {
    console.log('Deal clicked:', deal);
  };

  const handleGetDeal = (deal: Deal) => {
    window.open(deal.productUrl, '_blank');
  };

  return (
    <Container>
      <Typography variant="h2" align="center" style={{ margin: '40px 0 20px' }}>
        🎉 Events & Special Offers
      </Typography>
      
      <Typography variant="body" align="center" color="#6c757d" style={{ marginBottom: '30px' }}>
        Special event deals, festival offers, and seasonal discounts - minimum 50% off!
      </Typography>

      <FilterBar 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />

      <DealGrid 
        deals={deals}
        loading={loading}
        onDealClick={handleDealClick}
        onGetDeal={handleGetDeal}
        emptyMessage="No event offers available at the moment"
      />
    </Container>
  );
};

export default EventsPage;