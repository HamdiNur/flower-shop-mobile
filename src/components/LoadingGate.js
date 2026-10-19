import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useOrders } from '../context/OrdersContext';
import { colors } from '../utils/colors';

export default function LoadingGate({ children }) {
  const favorites = useFavorites();
  const cart = useCart();
  const orders = useOrders();

  const ready = favorites.loaded && cart.loaded && orders.loaded;

  if (!ready) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>🌸</Text>
        <Text style={styles.name}>Bloom Flower Shop</Text>
        <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { fontSize: 56 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.primary, marginTop: 8 },
  spinner: { marginTop: 20 },
});