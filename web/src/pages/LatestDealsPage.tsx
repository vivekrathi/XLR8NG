import React, { useState, useEffect } from 'react';
import { Deal, FilterOptions } from '../shared/types';
import { MockApiService } from '../shared/api';
import { Container, Typography } from '../styles/components';
import FilterBar from '../components/deals/FilterBar';
import DealGrid from '../components/deals/DealGrid';

const LatestDealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({ sortBy: 'newest' });

  useEffect(() => {
    loadDeals();
  }, [filters]);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const response = await MockApiService.getLatestDeals(1, 40);
      setDeals(response.deals);
    } catch (error) {
      console.error('Error loading latest deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters({ ...newFilters, sortBy: 'newest' });
  };

  const handleResetFilters = () => {
    setFilters({ sortBy: 'newest' });
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
        📈 Latest Deals
      </Typography>
      
      <Typography variant="body" align="center" color="#6c757d" style={{ marginBottom: '30px' }}>
        Fresh deals added daily from all your favorite stores
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
        emptyMessage="No latest deals available"
      />
    </Container>
  );
};

export default LatestDealsPage;