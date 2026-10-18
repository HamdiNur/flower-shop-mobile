import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../utils/colors';

export default function Header() {
  const navigation = useNavigation();
  const { favoriteIds } = useFavorites();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Welcome to</Text>
        <Text style={styles.name}>🌸 Bloom Flower Shop</Text>
      </View>

      <Pressable
        style={styles.favButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.favHeart}>♥</Text>
        <Text style={styles.favCount}>{favoriteIds.length}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: { fontSize: 14, color: colors.textLight },
  name: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  favHeart: { fontSize: 16, color: colors.primary, marginRight: 4 },
  favCount: { fontSize: 15, fontWeight: 'bold', color: colors.primary },
});