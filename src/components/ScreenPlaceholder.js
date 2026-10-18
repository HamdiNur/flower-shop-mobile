import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/colors';

export default function ScreenPlaceholder({ title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  message: {
    fontSize: 15,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
});