import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface ErrorViewProps {
  onBack: () => void;
}

const ErrorView = ({onBack}: ErrorViewProps) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Ürün bulunamadı</Text>
    <Button
      mode="contained"
      onPress={onBack}
      style={styles.backButton}
      labelStyle={styles.buttonLabel}
      icon="arrow-left"
      contentStyle={{flexDirection: 'row-reverse'}}>
      Geri Dön
    </Button>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    width: 200,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: '#64B5F6',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorView;
