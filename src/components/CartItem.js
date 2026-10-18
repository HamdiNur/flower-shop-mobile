import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';
import { formatPrice } from '../utils/formatPrice';

export default function CartItem({
  flower,
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <View style={styles.card}>
      <Image source={flower.image} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {flower.name}
          </Text>
          <Pressable onPress={onRemove} hitSlop={10}>
            <Text style={styles.remove}>✕</Text>
          </Pressable>
        </View>

        <Text style={styles.size}>Size: {item.sizeLabel}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.qtyRow}>
            <Pressable style={styles.qtyButton} onPress={onDecrease}>
              <Text style={styles.qtyButtonText}>−</Text>
            </Pressable>
            <Text style={styles.qtyValue}>{item.quantity}</Text>
            <Pressable style={styles.qtyButton} onPress={onIncrease}>
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.price}>
            {formatPrice(item.unitPrice * item.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 90,
    height: 100,
    marginRight: 12,
  },
  info: { flex: 1, justifyContent: 'space-between' },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { flex: 1, fontSize: 16, fontWeight: 'bold', color: colors.text },
  remove: { fontSize: 16, color: colors.textLight, marginLeft: 8 },
  size: { fontSize: 13, color: colors.textLight },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: { fontSize: 18, color: colors.green, fontWeight: 'bold' },
  qtyValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: 12,
  },
  price: { fontSize: 16, fontWeight: 'bold', color: colors.primary },
});