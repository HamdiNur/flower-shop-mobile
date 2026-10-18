import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import { flowers } from "../data/flowers";
import { colors } from "../utils/colors";

const categories = [
  "All",
  "Roses",
  "Tulips",
  "Lilies",
  "Sunflowers",
  "Bouquets",
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFlowers = flowers.filter((flower) => {
    const matchesCategory =
      selectedCategory === "All" || flower.category === selectedCategory;
    const matchesSearch = flower.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductPress = (flower) => {
    navigation.navigate("ProductDetails", { flowerId: flower.id });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <FlatList
        data={filteredFlowers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard flower={item} onPress={handleProductPress} />
        )}
        ListHeaderComponent={
          <View>
            <Header />
            <SearchBar value={search} onChangeText={setSearch} />
            <Banner />
            <CategoryList
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <Text style={styles.sectionTitle}>
              Popular flowers ({filteredFlowers.length})
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No flowers found. Try another search.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  empty: {
    textAlign: "center",
    color: colors.textLight,
    marginTop: 30,
    fontSize: 15,
  },
});
