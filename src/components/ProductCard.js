
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { formatPrice } from "../utils/formatPrice";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ flower, onPress }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(flower.id);

  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(flower)}
    >
      <View style={styles.imageBox}>
        <Image
          source={flower.image}
          style={styles.image}
          resizeMode="contain"
        />

        <Pressable
          style={styles.heart}
          onPress={(event) => {
            event.stopPropagation();
            toggleFavorite(flower.id);
          }}
          hitSlop={8}
        >
          <Text style={styles.heartText}>
            {favorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {flower.name}
      </Text>

      <Text style={styles.category}>
        {flower.category}
      </Text>

      <Text style={styles.price}>
        {formatPrice(flower.price)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  imageBox: {
    height: 130,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 6,
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  heartText: {
    fontSize: 16,
    color: colors.primary,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
  },

  category: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 6,
  },
});
