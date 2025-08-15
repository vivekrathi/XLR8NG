import React from 'react';
import styled from 'styled-components';
import { Deal } from '../../shared/types';
import { formatPrice, formatDiscountPercentage, truncateText } from '../../shared/utils';
import { Card, Typography, Badge, Button, FlexContainer } from '../../styles/components';
import { colors } from '../../styles/theme';

const DealCardContainer = styled(Card)`
  max-width: 300px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`;

const DealImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const DiscountBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  left: 12px;
  background: ${colors.danger};
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

const RetailerBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PriceContainer = styled(FlexContainer)`
  margin: 8px 0;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${colors.gray[500]};
  font-size: 14px;
`;

const DiscountedPrice = styled.span`
  color: ${colors.success};
  font-weight: 700;
  font-size: 18px;
`;

const DealTitle = styled(Typography)`
  margin-bottom: 8px;
  height: 48px;
  overflow: hidden;
`;

const CategoryTag = styled.span`
  background: ${colors.gray[200]};
  color: ${colors.gray[700]};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 8px;
`;

interface DealCardProps {
  deal: Deal;
  onClick?: (deal: Deal) => void;
  onGetDeal?: (deal: Deal) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onClick, onGetDeal }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(deal);
    }
  };

  const handleGetDeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onGetDeal) {
      onGetDeal(deal);
    } else {
      window.open(deal.productUrl, '_blank');
    }
  };

  return (
    <DealCardContainer onClick={handleClick} shadow>
      <DiscountBadge variant="danger">
        {formatDiscountPercentage(deal.discountPercentage)}
      </DiscountBadge>
      
      <RetailerBadge style={{ color: deal.retailer.primaryColor }}>
        {deal.retailer.name}
      </RetailerBadge>

      <DealImage src={deal.imageUrl} alt={deal.title} />
      
      <DealTitle variant="h6">
        {truncateText(deal.title, 60)}
      </DealTitle>
      
      <PriceContainer align="center" gap="12px">
        <DiscountedPrice>{formatPrice(deal.discountedPrice)}</DiscountedPrice>
        <OriginalPrice>{formatPrice(deal.originalPrice)}</OriginalPrice>
      </PriceContainer>
      
      <FlexContainer justify="space-between" align="center" style={{ marginBottom: '12px' }}>
        <CategoryTag>{deal.category.name}</CategoryTag>
        {deal.isFeatured && (
          <Badge variant="warning" size="small">Featured</Badge>
        )}
      </FlexContainer>
      
      <Button 
        variant="primary" 
        fullWidth 
        onClick={handleGetDeal}
      >
        GET DEAL
      </Button>
    </DealCardContainer>
  );
};

export default DealCard;