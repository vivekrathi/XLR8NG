import React from 'react';
import styled from 'styled-components';
import { Deal } from '../../shared/types';
import { Grid, LoadingSpinner, FlexContainer, Typography } from '../../styles/components';
import DealCard from './DealCard';

const DealGridContainer = styled.div`
  margin: 20px 0;
`;

const LoadingContainer = styled(FlexContainer)`
  height: 200px;
`;

const EmptyState = styled(FlexContainer)`
  height: 200px;
  text-align: center;
`;

interface DealGridProps {
  deals: Deal[];
  loading?: boolean;
  onDealClick?: (deal: Deal) => void;
  onGetDeal?: (deal: Deal) => void;
  emptyMessage?: string;
}

const DealGrid: React.FC<DealGridProps> = ({
  deals,
  loading = false,
  onDealClick,
  onGetDeal,
  emptyMessage = 'No deals found'
}) => {
  if (loading) {
    return (
      <LoadingContainer justify="center" align="center">
        <LoadingSpinner />
        <Typography style={{ marginLeft: '12px' }}>Loading deals...</Typography>
      </LoadingContainer>
    );
  }

  if (deals.length === 0) {
    return (
      <EmptyState justify="center" align="center" direction="column">
        <Typography variant="h4" color="#6c757d">
          📦
        </Typography>
        <Typography color="#6c757d" style={{ marginTop: '8px' }}>
          {emptyMessage}
        </Typography>
      </EmptyState>
    );
  }

  return (
    <DealGridContainer>
      <Grid>
        {deals.map(deal => (
          <DealCard
            key={deal.id}
            deal={deal}
            onClick={onDealClick}
            onGetDeal={onGetDeal}
          />
        ))}
      </Grid>
    </DealGridContainer>
  );
};

export default DealGrid;