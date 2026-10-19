import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../utils/colors';
import { formatPrice } from '../utils/formatPrice';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { order } = route.params;

  const goHome = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.title}>Order placed!</Text>
          <Text style={styles.subtitle}>Thank you, {order.customer.name}.</Text>
          <Text style={styles.orderId}>Order {order.id}</Text>
          <Text style={styles.date}>{order.placedAt}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivering to</Text>
          <Text style={styles.cardText}>{order.customer.address}</Text>
          <Text style={styles.cardText}>{order.customer.phone}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order summary</Text>
          {order.lines.map((line) => (
            <View key={line.key} style={styles.row}>
              <Text style={styles.itemText} numberOfLines={1}>
                {line.quantity} × {line.name} ({line.sizeLabel})
              </Text>
              <Text style={styles.value}>{formatPrice(line.lineTotal)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>{formatPrice(order.subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.value}>
              {order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
          </View>
        </View>

        <Text style={styles.note}>
          This was a demo order. No payment was taken and nothing was sent to a shop.
        </Text>

        <Pressable style={styles.button} onPress={goHome}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  header: { alignItems: 'center', marginVertical: 20 },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: { fontSize: 36, color: colors.green, fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginTop: 14 },
  subtitle: { fontSize: 16, color: colors.textLight, marginTop: 4 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: colors.primary, marginTop: 10 },
  date: { fontSize: 13, color: colors.textLight, marginTop: 2 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  cardText: { fontSize: 15, color: colors.textLight, marginBottom: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemText: { flex: 1, fontSize: 14, color: colors.text, marginRight: 10 },
  label: { fontSize: 15, color: colors.textLight },
  value: { fontSize: 15, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  note: { fontSize: 13, color: colors.textLight, textAlign: 'center', marginVertical: 8 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});