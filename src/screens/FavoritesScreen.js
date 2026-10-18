import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../context/FavoritesContext';
import { flowers } from '../data/flowers';
import { colors } from '../utils/colors';

export default function FavoritesScreen({ navigation }) {
  const { favoriteIds } = useFavorites();

  const favoriteFlowers = flowers.filter((flower) =>
    favoriteIds.includes(flower.id)
  );

  const handleProductPress = (flower) => {
    navigation.navigate('ProductDetails', { flowerId: flower.id });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={favoriteFlowers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard flower={item} onPress={handleProductPress} />
        )}
        ListHeaderComponent={
          <Text style={styles.title}>Favorites ({favoriteFlowers.length})</Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🌸</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Tap the heart on any flower to save it here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, flexGrow: 1 },
  row: { justifyContent: 'space-between' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
  },
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
});