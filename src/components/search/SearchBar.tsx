import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar as PaperSearchbar} from 'react-native-paper';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar = ({onSearch}: SearchBarProps) => (
  <PaperSearchbar
    placeholder="Ürün ara"
    onChangeText={onSearch}
    style={styles.searchBar}
    autoCapitalize="none"
    autoCorrect={false}
    clearButtonMode="while-editing"
    returnKeyType="search"
    blurOnSubmit={true}
  />
);

const styles = StyleSheet.create({
  searchBar: {
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: 'white',
  },
});

export default SearchBar;
