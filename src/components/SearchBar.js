import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../utils/colors';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search flowers..."
        placeholderTextColor={colors.textLight}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    height: 48,
    fontSize: 16,
    color: colors.text,
  },
});