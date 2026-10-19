import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useOrders } from '../context/OrdersContext';
import { colors } from '../utils/colors';
import { formatPrice } from '../utils/formatPrice';

export default function ProfileScreen() {
  const { orders, clearOrders } = useOrders();
  const { favoriteIds } = useFavorites();
  const { totalItems } = useCart();

  const handleClearHistory = () => {
    Alert.alert('Clear order history?', 'This removes all saved demo orders.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearOrders },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🌸</Text>
          </View>
          <Text style={styles.name}>Flower Lover</Text>
          <Text style={styles.subtitle}>Bloom Flower Shop customer</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{favoriteIds.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{totalItems}</Text>
            <Text style={styles.statLabel}>In cart</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order history</Text>
        {orders.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.emptyText}>
              No orders yet. Your demo orders will appear here.
            </Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.card}>
              <View style={styles.orderTop}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderTotal}>{formatPrice(order.total)}</Text>
              </View>
              <Text style={styles.orderDate}>{order.placedAt}</Text>
              {order.lines.map((line) => (
                <Text key={line.key} style={styles.orderLine} numberOfLines={1}>
                  {line.quantity} × {line.name} ({line.sizeLabel})
                </Text>
              ))}
            </View>
          ))
        )}
        {orders.length > 0 && (
          <Pressable onPress={handleClearHistory}>
            <Text style={styles.clearText}>Clear order history</Text>
          </Pressable>
        )}

        <Text style={styles.sectionTitle}>Contact us</Text>
        <View style={styles.card}>
          <Text style={styles.contactLine}>📍 12 Garden Street, Mogadishu</Text>
          <Text style={styles.contactLine}>📞 +252 61 000 0000</Text>
          <Text style={styles.contactLine}>✉️ hello@bloomflowers.example</Text>
          <Text style={styles.contactLine}>🕗 Open daily 8am – 8pm</Text>
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          <Text style={styles.emptyText}>
            Notifications, language, and theme settings are coming soon.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 36 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginTop: 10 },
  subtitle: { fontSize: 14, color: colors.textLight, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stat: {
    width: '31%',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 13, color: colors.textLight, marginTop: 2 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: { fontSize: 14, color: colors.textLight },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between' },
  orderId: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  orderTotal: { fontSize: 15, fontWeight: 'bold', color: colors.primary },
  orderDate: { fontSize: 12, color: colors.textLight, marginTop: 2, marginBottom: 6 },
  orderLine: { fontSize: 13, color: colors.textLight, marginTop: 2 },
  clearText: {
    fontSize: 14,
    color: '#D64545',
    textAlign: 'center',
    marginTop: 4,
  },
  contactLine: { fontSize: 14, color: colors.text, marginBottom: 6 },
});