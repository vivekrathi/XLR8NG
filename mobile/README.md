# React Native Mobile App

This is the React Native mobile application for the TheDealApp clone.

## Features

- **Tab Navigation**: Home, Super Deals, Latest, Price Drops, Events
- **Deal Browsing**: Browse deals in grid layout optimized for mobile
- **Deal Details**: Full screen deal information with product details
- **Search Functionality**: Search for deals with live results
- **Native Design**: Platform-optimized UI components and navigation
- **Shared Code**: Uses the same data models and API as the web app

## Screens

### HomeScreen
- Hero section with search functionality
- Statistics cards showing app metrics
- Horizontal scrolling deal sections for different categories
- Search results display when searching

### Category Screens
- **SuperDealsScreen**: Deals with minimum 70% discount
- **LatestDealsScreen**: Recently added deals
- **PriceDropsScreen**: Products with recent price reductions
- **EventsScreen**: Special offers and seasonal deals

### DealDetailScreen
- Full product information
- Retailer details and branding
- Pricing with savings calculation
- Category and tags information
- "GET DEAL NOW" button that opens retailer website

## Components

### DealCard
- Product image placeholder
- Discount percentage badge
- Retailer identification
- Pricing information
- Category tags
- GET DEAL button

### DealGrid
- Horizontal scrolling for mobile optimization
- Loading states
- Empty state handling
- Responsive layout

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. For Android development:
   ```bash
   npm run android
   ```

3. For iOS development:
   ```bash
   npm run ios
   ```

4. Start Metro bundler:
   ```bash
   npm start
   ```

## Architecture

The mobile app shares the same data layer as the web application:
- `src/shared/`: Contains API, types, utilities, and constants
- `src/screens/`: Main application screens
- `src/components/`: Reusable UI components
- Navigation handled by React Navigation v6

## Navigation Structure

```
TabNavigator
├── Home
├── Super Deals  
├── Latest
├── Price Drops
└── Events

StackNavigator
├── MainTabs
└── DealDetail
```

The app provides a native mobile experience while maintaining feature parity with the web application.