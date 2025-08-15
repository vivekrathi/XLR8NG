import React, { useState, useEffect } from 'react';
import { Deal, FilterOptions } from '../shared/types';
import { MockApiService } from '../shared/api';
import { Container, Typography } from '../styles/components';
import FilterBar from '../components/deals/FilterBar';
import DealGrid from '../components/deals/DealGrid';

const SuperDealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({ minDiscount: 70 });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadDeals();
  }, [filters]);

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

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters({ ...newFilters, minDiscount: Math.max(newFilters.minDiscount || 0, 70) });
  };

  const handleResetFilters = () => {
    setFilters({ minDiscount: 70 });
  };

  const handleDealClick = (deal: Deal) => {
    console.log('Deal clicked:', deal);
  };

  const handleGetDeal = (deal: Deal) => {
    window.open(deal.productUrl, '_blank');
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadDeals(page + 1);
    }
  };

  return (
    <Container>
      <Typography variant="h2" align="center" style={{ margin: '40px 0 20px' }}>
        🔥 Super Deals - Minimum 70% Off
      </Typography>
      
      <Typography variant="body" align="center" color="#6c757d" style={{ marginBottom: '30px' }}>
        Handpicked deals with massive discounts from your favorite brands
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
        emptyMessage="No super deals available at the moment"
      />

      {hasMore && !loading && deals.length > 0 && (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button 
            onClick={handleLoadMore}
            style={{
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Load More Deals
          </button>
        </div>
      )}
    </Container>
  );
};

export default SuperDealsPage;