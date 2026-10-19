import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';
import { useCart } from '../context/CartContext';
import { flowers } from '../data/flowers';
import { colors } from '../utils/colors';
import { formatPrice } from '../utils/formatPrice';
import { validateCheckout } from '../utils/validation';
import { useOrders } from '../context/OrdersContext';

export default function CheckoutScreen({ navigation }) {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
   const { addOrder } = useOrders();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handlePlaceOrder = () => {
    const foundErrors = validateCheckout({ name, phone, address });
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    const order = {
      id: `BLM-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toLocaleString(),
      customer: { name: name.trim(), phone: phone.trim(), address: address.trim() },
      lines: items.map((item) => {
        const flower = flowers.find((f) => f.id === item.flowerId);
        return {
          key: item.key,
          name: flower ? flower.name : 'Flower',
          sizeLabel: item.sizeLabel,
          quantity: item.quantity,
          lineTotal: item.unitPrice * item.quantity,
        };
      }),
      subtotal,
      deliveryFee,
      total,
    };
addOrder(order);
navigation.replace('OrderConfirmation', { order });
clearCart();
  };

  if (items.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Delivery details</Text>

          <FormField
            label="Full name"
            value={name}
            onChangeText={setName}
            error={errors.name}
            placeholder="e.g. Amina Hassan"
          />
          <FormField
            label="Phone number"
            value={phone}
            onChangeText={setPhone}
            error={errors.phone}
            placeholder="e.g. 0612345678"
            keyboardType="phone-pad"
          />
          <FormField
            label="Delivery address"
            value={address}
            onChangeText={setAddress}
            error={errors.address}
            placeholder="Street, area, and city"
            multiline
          />

          <Text style={styles.sectionTitle}>Order summary</Text>
          <View style={styles.summary}>
            {items.map((item) => {
              const flower = flowers.find((f) => f.id === item.flowerId);
              return (
                <View key={item.key} style={styles.summaryRow}>
                  <Text style={styles.itemText} numberOfLines={1}>
                    {item.quantity} × {flower ? flower.name : 'Flower'} ({item.sizeLabel})
                  </Text>
                  <Text style={styles.summaryValue}>
                    {formatPrice(item.unitPrice * item.quantity)}
                  </Text>
                </View>
              );
            })}

            <View style={styles.divider} />

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
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </View>

          <Text style={styles.note}>
            This is a demo checkout. No payment is taken and no order is sent anywhere.
          </Text>

          <Pressable style={styles.button} onPress={handlePlaceOrder}>
            <Text style={styles.buttonText}>Place Order · {formatPrice(total)}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { padding: 20 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  emptyText: { fontSize: 16, color: colors.textLight },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    marginTop: 4,
  },
  summary: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: { flex: 1, fontSize: 14, color: colors.text, marginRight: 10 },
  summaryLabel: { fontSize: 15, color: colors.textLight },
  summaryValue: { fontSize: 15, color: colors.text },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
  note: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 14,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});