import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../utils/colors';

export default function FormField({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType,
  multiline,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 16,
    color: colors.text,
  },
  multiline: {
    height: 90,
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#D64545',
  },
  error: {
    fontSize: 13,
    color: '#D64545',
    marginTop: 4,
  },
});