import React, { useState, useEffect } from 'react';
import { Deal, FilterOptions } from '../shared/types';
import { MockApiService } from '../shared/api';
import { Container, Typography } from '../styles/components';
import FilterBar from '../components/deals/FilterBar';
import DealGrid from '../components/deals/DealGrid';

const PriceDropsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    loadDeals();
  }, [filters]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const response = await MockApiService.getPriceDrops(1, 40);
      setDeals(response.deals);
    } catch (error) {
      console.error('Error loading price drops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
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
        💸 Recent Price Drops
      </Typography>
      
      <Typography variant="body" align="center" color="#6c757d" style={{ marginBottom: '30px' }}>
        Products that have dropped in price recently - grab them before prices go back up!
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
        emptyMessage="No recent price drops found"
      />
    </Container>
  );
};

export default PriceDropsPage;