import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { flowers } from '../data/flowers';
import { colors } from '../utils/colors';
import { formatPrice } from '../utils/formatPrice';

export default function CartScreen({ navigation }) {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    subtotal,
    deliveryFee,
    total,
  } = useCart();

const handleCheckout = () => {
  navigation.navigate('Checkout');
};
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.title}>My Cart</Text>}
        renderItem={({ item }) => {
          const flower = flowers.find((f) => f.id === item.flowerId);
          if (!flower) return null;
          return (
            <CartItem
              flower={flower}
              item={item}
              onIncrease={() => increaseQuantity(item.key)}
              onDecrease={() => decreaseQuantity(item.key)}
              onRemove={() => removeItem(item.key)}
            />
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptyText}>
              Add some beautiful flowers to get started.
            </Text>
            <Pressable
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopButtonText}>Browse flowers</Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={
          items.length > 0 ? (
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>
                  {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>

              <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              </Pressable>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, flexGrow: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  empty: { alignItems: 'center', marginTop: 80, paddingHorizontal: 20 },
  emptyIcon: { fontSize: 56 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 6,
  },
  shopButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 20,
  },
  shopButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  summary: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 15, color: colors.textLight },
  summaryValue: { fontSize: 15, color: colors.text },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 6,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  checkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 14,
  },
  checkoutText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});