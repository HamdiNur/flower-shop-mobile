
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  DefaultTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/navigation/AppNavigator";
import { colors } from "./src/utils/colors";

import { FavoritesProvider } from "./src/context/FavoritesContext";
import { CartProvider } from "./src/context/CartContext";
import { OrdersProvider } from "./src/context/OrdersContext";

import LoadingGate from "./src/components/LoadingGate";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <CartProvider>
          <OrdersProvider>
            <LoadingGate>
              <NavigationContainer theme={theme}>
                <AppNavigator />
                <StatusBar style="dark" />
              </NavigationContainer>
            </LoadingGate>
          </OrdersProvider>
        </CartProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
