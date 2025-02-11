import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LoadingIndicator from '../shared/LoadingIndicator';

interface EmptySearchResultProps {
  isLoading: boolean;
  isSearching: boolean;
}

const EmptySearchResult = ({
  isLoading,
  isSearching,
}: EmptySearchResultProps) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {isSearching ? 'Ürün bulunamadı.' : 'Lütfen arama yapınız'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default EmptySearchResult;
