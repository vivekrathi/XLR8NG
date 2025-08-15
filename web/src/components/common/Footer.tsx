import React from 'react';
import styled from 'styled-components';
import { Container, FlexContainer, Typography } from '../../styles/components';
import { colors } from '../../styles/theme';

const FooterContainer = styled.footer`
  background: ${colors.gray[800]};
  color: white;
  margin-top: 60px;
  padding: 40px 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled(Typography)`
  margin-bottom: 16px;
  color: white;
`;

const FooterLink = styled.a`
  display: block;
  color: ${colors.gray[300]};
  margin-bottom: 8px;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const SocialLinks = styled(FlexContainer)`
  margin-top: 16px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${colors.gray[700]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid ${colors.gray[700]};
  color: ${colors.gray[400]};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <FooterTitle variant="h5">About TheDealApp</FooterTitle>
            <Typography color={colors.gray[300]} style={{ marginBottom: '16px' }}>
              Your ultimate destination for the best deals and discounts from top retailers. 
              Save money on electronics, fashion, home & kitchen, and more.
            </Typography>
            <SocialLinks gap="12px">
              <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
              <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
              <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
              <SocialLink href="#" aria-label="YouTube">📺</SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle variant="h5">Quick Links</FooterTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/super-deals">Super Deals</FooterLink>
            <FooterLink href="/latest">Latest Deals</FooterLink>
            <FooterLink href="/price-drops">Price Drops</FooterLink>
            <FooterLink href="/events">Events & Offers</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle variant="h5">Categories</FooterTitle>
            <FooterLink href="/category/electronics">Electronics</FooterLink>
            <FooterLink href="/category/fashion">Fashion</FooterLink>
            <FooterLink href="/category/home">Home & Kitchen</FooterLink>
            <FooterLink href="/category/beauty">Beauty & Personal Care</FooterLink>
            <FooterLink href="/category/sports">Sports & Fitness</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle variant="h5">Support</FooterTitle>
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
          </FooterSection>
        </FooterContent>

        <Copyright>
          <Typography variant="caption">
            © 2024 TheDealApp. All rights reserved. Built with ❤️ for deal hunters.
          </Typography>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;