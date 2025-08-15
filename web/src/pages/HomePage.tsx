import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Deal, FilterOptions } from '../shared/types';
import { MockApiService } from '../shared/api';
import { Container, Typography, FlexContainer } from '../styles/components';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/deals/FilterBar';
import DealGrid from '../components/deals/DealGrid';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  margin-bottom: 40px;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const StatsContainer = styled(FlexContainer)`
  margin: 40px 0;
  text-align: center;
`;

const StatCard = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin: 0 10px;
`;

const StatNumber = styled(Typography)`
  color: #007bff;
  margin-bottom: 8px;
`;

const SectionTitle = styled(Typography)`
  margin: 40px 0 20px;
  text-align: center;
`;

const HomePage: React.FC = () => {
  const [superDeals, setSuperDeals] = useState<Deal[]>([]);
  const [latestDeals, setLatestDeals] = useState<Deal[]>([]);
  const [priceDrops, setPriceDrops] = useState<Deal[]>([]);
  const [eventOffers, setEventOffers] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Deal[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [superDealsRes, latestDealsRes, priceDropsRes, eventOffersRes] = await Promise.all([
        MockApiService.getSuperDeals(1, 8),
        MockApiService.getLatestDeals(1, 8),
        MockApiService.getPriceDrops(1, 8),
        MockApiService.getEventOffers(1, 8)
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await MockApiService.searchDeals({ query, ...filters });
      setSearchResults(response.deals);
    } catch (error) {
      console.error('Error searching deals:', error);
    }
  };

  const handleFiltersChange = async (newFilters: FilterOptions) => {
    setFilters(newFilters);
    if (isSearching) {
      // Re-run search with new filters
      const response = await MockApiService.getDeals(1, 20, newFilters);
      setSearchResults(response.deals);
    }
  };

  const handleResetFilters = () => {
    setFilters({});
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleDealClick = (deal: Deal) => {
    console.log('Deal clicked:', deal);
    // TODO: Navigate to deal detail page
  };

  const handleGetDeal = (deal: Deal) => {
    window.open(deal.productUrl, '_blank');
  };

  return (
    <>
      <HeroSection>
        <Container>
          <HeroContent>
            <Typography variant="h1" align="center" style={{ marginBottom: '20px' }}>
              Discover Amazing Deals & Save Big! 💰
            </Typography>
            <Typography variant="h4" align="center" style={{ marginBottom: '30px', opacity: 0.9 }}>
              Find the best discounts from top retailers in India
            </Typography>
            <SearchBar onSearch={handleSearch} />
          </HeroContent>
        </Container>
      </HeroSection>

      <Container>
        <StatsContainer gap="20px" wrap>
          <StatCard>
            <StatNumber variant="h2">10,000+</StatNumber>
            <Typography variant="h6" color="#6c757d">Active Deals</Typography>
          </StatCard>
          <StatCard>
            <StatNumber variant="h2">50+</StatNumber>
            <Typography variant="h6" color="#6c757d">Partner Stores</Typography>
          </StatCard>
          <StatCard>
            <StatNumber variant="h2">90%</StatNumber>
            <Typography variant="h6" color="#6c757d">Max Savings</Typography>
          </StatCard>
          <StatCard>
            <StatNumber variant="h2">1M+</StatNumber>
            <Typography variant="h6" color="#6c757d">Happy Users</Typography>
          </StatCard>
        </StatsContainer>

        {isSearching ? (
          <>
            <FilterBar 
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
            <SectionTitle variant="h3">
              Search Results ({searchResults.length} deals found)
            </SectionTitle>
            <DealGrid 
              deals={searchResults}
              onDealClick={handleDealClick}
              onGetDeal={handleGetDeal}
              emptyMessage="No deals found for your search"
            />
          </>
        ) : (
          <>
            <SectionTitle variant="h3">🔥 Super Deals - Up to 90% Off</SectionTitle>
            <DealGrid 
              deals={superDeals}
              loading={loading}
              onDealClick={handleDealClick}
              onGetDeal={handleGetDeal}
            />

            <SectionTitle variant="h3">📈 Latest Deals</SectionTitle>
            <DealGrid 
              deals={latestDeals}
              loading={loading}
              onDealClick={handleDealClick}
              onGetDeal={handleGetDeal}
            />

            <SectionTitle variant="h3">💸 Recent Price Drops</SectionTitle>
            <DealGrid 
              deals={priceDrops}
              loading={loading}
              onDealClick={handleDealClick}
              onGetDeal={handleGetDeal}
            />

            <SectionTitle variant="h3">🎉 Events & Offers</SectionTitle>
            <DealGrid 
              deals={eventOffers}
              loading={loading}
              onDealClick={handleDealClick}
              onGetDeal={handleGetDeal}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;