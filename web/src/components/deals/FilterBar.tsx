import React, { useState } from 'react';
import styled from 'styled-components';
import { FilterOptions } from '../../shared/types';
import { CATEGORIES, RETAILERS } from '../../shared/constants';
import { FlexContainer, Button, Input, Card } from '../../styles/components';
import { colors } from '../../styles/theme';

const FilterContainer = styled(Card)`
  margin: 20px 0;
  background: white;
`;

const FilterGroup = styled.div`
  margin-bottom: 16px;
`;

const FilterLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${colors.gray[700]};
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 2px solid ${colors.gray[300]};
  border-radius: 6px;
  font-size: 14px;
  background: white;
  min-width: 120px;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

const PriceInput = styled(Input)`
  max-width: 120px;
`;

const ResetButton = styled(Button)`
  background: ${colors.gray[500]};
  
  &:hover {
    background: ${colors.gray[600]};
  }
`;

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onReset
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters: FilterOptions = {};
    setLocalFilters(emptyFilters);
    onReset();
  };

  return (
    <FilterContainer>
      <FlexContainer gap="20px" wrap>
        <FilterGroup>
          <FilterLabel>Category</FilterLabel>
          <Select
            value={localFilters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          >
            <option value="">All Categories</option>
            {Object.values(CATEGORIES).map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Retailer</FilterLabel>
          <Select
            value={localFilters.retailer || ''}
            onChange={(e) => handleFilterChange('retailer', e.target.value || undefined)}
          >
            <option value="">All Retailers</option>
            {Object.values(RETAILERS).map(retailer => (
              <option key={retailer.id} value={retailer.id}>
                {retailer.name}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Min Discount %</FilterLabel>
          <Select
            value={localFilters.minDiscount || ''}
            onChange={(e) => handleFilterChange('minDiscount', e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Any Discount</option>
            <option value="30">30% or more</option>
            <option value="50">50% or more</option>
            <option value="70">70% or more</option>
            <option value="80">80% or more</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Max Price (₹)</FilterLabel>
          <PriceInput
            type="number"
            placeholder="Max price"
            value={localFilters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Sort By</FilterLabel>
          <Select
            value={localFilters.sortBy || 'newest'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
          >
            <option value="newest">Newest First</option>
            <option value="discount">Highest Discount</option>
            <option value="price">Lowest Price</option>
            <option value="popularity">Most Popular</option>
          </Select>
        </FilterGroup>

        <FilterGroup style={{ alignSelf: 'flex-end' }}>
          <ResetButton onClick={handleReset}>
            Reset Filters
          </ResetButton>
        </FilterGroup>
      </FlexContainer>
    </FilterContainer>
  );
};

export default FilterBar;