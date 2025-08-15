import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, FlexContainer } from '../../styles/components';
import { colors } from '../../styles/theme';

const SearchContainer = styled(FlexContainer)`
  margin: 20px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled(Input)`
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border-radius: 25px;
  border: 2px solid ${colors.gray[300]};
  
  &:focus {
    border-color: ${colors.primary};
  }
`;

const SearchButton = styled(Button)`
  border-radius: 25px;
  padding: 16px 24px;
  margin-left: 12px;
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for deals, products, brands...",
  initialValue = ""
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchButton type="submit" variant="primary">
          🔍 Search
        </SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;