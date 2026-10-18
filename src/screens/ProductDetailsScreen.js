import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { flowers } from '../data/flowers';
import { colors } from '../utils/colors';
import { formatPrice } from '../utils/formatPrice';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';


const sizes = [
  { label: 'Small', extra: 0 },
  { label: 'Medium', extra: 5 },
  { label: 'Large', extra: 10 },
];

export default function ProductDetailsScreen({ route, navigation }) {
  const { flowerId } = route.params;
  const flower = flowers.find((item) => item.id === flowerId);

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  

  if (!flower) {
    return (
    <Pressable style={styles.heart} onPress={() => toggleFavorite(flower.id)}>
  <Text style={styles.heartText}>{isFavorite(flower.id) ? '♥' : '♡'}</Text>
</Pressable>
    );
  }

  const unitPrice = flower.price + selectedSize.extra;
  const total = unitPrice * quantity;

  const related = flowers
    .filter((item) => item.category === flower.category && item.id !== flower.id)
    .slice(0, 4);

const handleAddToCart = () => {
  addToCart(flower.id, selectedSize.label, unitPrice, quantity);
  setQuantity(1);

  Alert.alert('Added to cart', `${quantity} × ${flower.name} (${selectedSize.label})`, [
    { text: 'Keep shopping', style: 'cancel' },
    {
      text: 'View cart',
      onPress: () => navigation.navigate('Tabs', { screen: 'Cart' }),
    },
  ]);
};
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageBox}>
          <Image source={flower.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.name}>{flower.name}</Text>
          <View style={styles.heart}>
            <Text style={styles.heartText}>♡</Text>
          </View>
        </View>
        <Text style={styles.category}>{flower.category}</Text>
        <Text style={styles.price}>{formatPrice(unitPrice)}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{flower.description}</Text>

        <Text style={styles.sectionTitle}>Bouquet size</Text>
        <View style={styles.sizeRow}>
          {sizes.map((size) => {
            const isActive = size.label === selectedSize.label;
            return (
              <Pressable
                key={size.label}
                onPress={() => setSelectedSize(size)}
                style={[styles.sizeChip, isActive && styles.sizeChipActive]}
              >
                <Text style={[styles.sizeText, isActive && styles.sizeTextActive]}>
                  {size.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityRow}>
          <Pressable
            style={styles.qtyButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.qtyButtonText}>−</Text>
          </Pressable>
          <Text style={styles.qtyValue}>{quantity}</Text>
          <Pressable style={styles.qtyButton} onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyButtonText}>+</Text>
          </Pressable>
        </View>

        <Pressable style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart · {formatPrice(total)}</Text>
        </Pressable>

        {related.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Related flowers</Text>
            <FlatList
              data={related}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.relatedCard}
                  onPress={() => navigation.push('ProductDetails', { flowerId: item.id })}
                >
                  <Image source={item.image} style={styles.relatedImage} resizeMode="contain" />
                  <Text style={styles.relatedName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.relatedPrice}>{formatPrice(item.price)}</Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: 16, color: colors.textLight },
  imageBox: {
    height: 280,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  image: { width: '100%', height: '100%' },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { flex: 1, fontSize: 24, fontWeight: 'bold', color: colors.text },
  heart: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartText: { fontSize: 20, color: colors.primary },
  category: { fontSize: 14, color: colors.textLight, marginTop: 2 },
  price: { fontSize: 26, fontWeight: 'bold', color: colors.primary, marginTop: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 22,
    marginBottom: 10,
  },
  description: { fontSize: 15, lineHeight: 22, color: colors.textLight },
  sizeRow: { flexDirection: 'row' },
  sizeChip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sizeChipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  sizeText: { fontSize: 14, color: colors.text },
  sizeTextActive: { color: colors.primary, fontWeight: 'bold' },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: { fontSize: 22, color: colors.green, fontWeight: 'bold' },
  qtyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 26,
  },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  relatedCard: {
    width: 130,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  relatedImage: { width: '100%', height: 90 },
  relatedName: { fontSize: 13, fontWeight: 'bold', color: colors.text, marginTop: 6 },
  relatedPrice: { fontSize: 13, color: colors.primary, marginTop: 2 },
});