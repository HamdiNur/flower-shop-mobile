# 🌸 Bloom Flower Shop

A mobile flower shop app built with **React Native** and **Expo**. Customers can browse flowers, save favorites, manage a shopping cart, and place a demo order. Everything is saved on the device, so the cart, favorites, and order history survive an app restart.

This is a learning project. The checkout is **simulated**: no payment is taken, and no order is sent to a server.

## Features

- **Home:** shop header, search bar, auto-sliding promo carousel, category chips, and a two-column product grid
- **Search and filters:** search by flower name, filter by category, and combine both
- **Product details:** large photo, description, bouquet size (Small, Medium, Large), quantity selector, and related flowers
- **Favorites:** heart button on every card and on the details screen, with a dedicated Favorites tab and an empty state
- **Shopping cart:** add, remove, and change quantities, with a live subtotal, delivery fee (free over $50), and total
- **Checkout:** name, phone, and address form with validation, an order summary, and an order confirmation screen
- **Profile:** order history, stats, contact information, and a settings placeholder
- **Persistence:** cart, favorites, and orders saved with AsyncStorage
- **Loading screen:** a spinner shown while saved data is loaded

## Tech stack

- React Native
- Expo (SDK 54)
- JavaScript
- React Navigation (native stack and bottom tabs)
- React Context for shared state (favorites, cart, orders)
- AsyncStorage for local persistence
- `StyleSheet` and Flexbox for styling

## Project structure

```
flower-shop/
├── App.js                  # App entry: providers, navigation, loading gate
├── app.json                # Expo configuration
├── assets/
│   └── images/flowers/     # Flower photos
└── src/
    ├── components/         # Reusable UI: ProductCard, Banner, CartItem, FormField...
    ├── context/            # FavoritesContext, CartContext, OrdersContext
    ├── data/               # flowers.js (sample product data)
    ├── navigation/         # AppNavigator (tabs and stack)
    ├── screens/            # Home, Details, Favorites, Cart, Checkout, Profile...
    └── utils/              # colors, formatPrice, validation, usePersistentState
```

## Getting started

### Requirements

- [Node.js](https://nodejs.org) (current LTS)
- The **Expo Go** app on your phone (it must support Expo SDK 54)

### Run the app

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/flower-shop.git
cd flower-shop

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iPhone). Your phone and computer must be on the same Wi-Fi. If the app won't connect, try:

```bash
npx expo start --tunnel
```

If you see strange errors after changing files, clear the cache:

```bash
npx expo start -c
```

## Screenshots

Add your screenshots to a `screenshots/` folder and link them here:

| Home | Details | Cart | Checkout |
|---|---|---|---|
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Cart](screenshots/cart.png) | ![Checkout](screenshots/checkout.png) |

## What I learned

- Building reusable components and passing data with props
- Managing state with `useState` and `useEffect`
- Rendering lists and grids with `FlatList`
- Stack and tab navigation, and passing route params
- Sharing state across screens with React Context
- Form validation and keyboard handling
- Persisting data with AsyncStorage
- Animating a carousel with the `Animated` API
- Debugging common React Native errors

## Roadmap

- [ ] Real discount codes for the promo banner
- [ ] Replace local data with a backend (Firebase or Supabase)
- [ ] User accounts
- [ ] Order status tracking
- [ ] Push notifications

## Notes

This project is for learning and portfolio purposes. Make sure you have the right to share any photos you add to the repository.