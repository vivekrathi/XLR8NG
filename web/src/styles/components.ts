import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 'auto-fit'}, minmax(280px, 1fr));
  gap: ${props => props.gap || '20px'};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FlexContainer = styled.div<{
  direction?: 'row' | 'column';
  justify?: string;
  align?: string;
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  gap: ${props => props.gap || '0'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

export const Card = styled.div<{ padding?: string; shadow?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: ${props => props.padding || '20px'};
  box-shadow: ${props => props.shadow ? '0 2px 12px rgba(0, 0, 0, 0.1)' : 'none'};
  border: 1px solid #eee;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: #6c757d;
          color: white;
          &:hover {
            background: #5a6268;
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #007bff;
          border: 2px solid #007bff;
          &:hover {
            background: #007bff;
            color: white;
          }
        `;
      default:
        return `
          background: #007bff;
          color: white;
          &:hover {
            background: #0056b3;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Input = styled.input<{ fullWidth?: boolean }>`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const Typography = styled.div<{
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
  color?: string;
  weight?: number;
  align?: 'left' | 'center' | 'right';
}>`
  color: ${props => props.color || 'inherit'};
  font-weight: ${props => props.weight || 'normal'};
  text-align: ${props => props.align || 'left'};
  
  ${props => {
    switch (props.variant) {
      case 'h1':
        return 'font-size: 2.5rem; font-weight: 700; line-height: 1.2;';
      case 'h2':
        return 'font-size: 2rem; font-weight: 600; line-height: 1.3;';
      case 'h3':
        return 'font-size: 1.5rem; font-weight: 600; line-height: 1.4;';
      case 'h4':
        return 'font-size: 1.25rem; font-weight: 600; line-height: 1.4;';
      case 'h5':
        return 'font-size: 1.1rem; font-weight: 600; line-height: 1.4;';
      case 'h6':
        return 'font-size: 1rem; font-weight: 600; line-height: 1.4;';
      case 'caption':
        return 'font-size: 0.875rem; color: #6c757d; line-height: 1.4;';
      default:
        return 'font-size: 1rem; line-height: 1.6;';
    }
  }}

  @media (max-width: 768px) {
    ${props => {
      switch (props.variant) {
        case 'h1':
          return 'font-size: 2rem;';
        case 'h2':
          return 'font-size: 1.75rem;';
        case 'h3':
          return 'font-size: 1.4rem;';
        default:
          return '';
      }
    }}
  }
`;

export const Badge = styled.span<{
  variant?: 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium';
}>`
  display: inline-block;
  padding: ${props => props.size === 'small' ? '4px 8px' : '6px 12px'};
  font-size: ${props => props.size === 'small' ? '12px' : '14px'};
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => {
    switch (props.variant) {
      case 'success':
        return 'background: #28a745; color: white;';
      case 'danger':
        return 'background: #dc3545; color: white;';
      case 'warning':
        return 'background: #ffc107; color: #212529;';
      case 'info':
        return 'background: #17a2b8; color: white;';
      default:
        return 'background: #6c757d; color: white;';
    }
  }}
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;