import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Chip} from 'react-native-paper';

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
}

const CategoryList = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryListProps) => (
  <View style={styles.categoryWrapper}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
      contentContainerStyle={styles.categoryContent}>
      <Chip
        mode="outlined"
        selected={selectedCategory === null}
        onPress={() => onSelectCategory(null)}
        style={[
          styles.categoryChip,
          selectedCategory === null && styles.selectedChip,
        ]}
        textStyle={[
          styles.chipText,
          selectedCategory === null && styles.selectedChipText,
        ]}>
        Tüm Ürünler
      </Chip>
      {categories.map(category => (
        <Chip
          key={category.id}
          mode="outlined"
          selected={selectedCategory === category.id}
          onPress={() => onSelectCategory(category.id)}
          style={[
            styles.categoryChip,
            selectedCategory === category.id && styles.selectedChip,
          ]}
          textStyle={[
            styles.chipText,
            selectedCategory === category.id && styles.selectedChipText,
          ]}>
          {category.name}
        </Chip>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  categoryWrapper: {
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryContainer: {
    flexGrow: 0,
  },
  categoryContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    marginRight: 8,
    borderColor: '#2196F3',
    backgroundColor: 'white',
    height: 36,
    borderWidth: 1.5,
    paddingHorizontal: 12,
  },
  selectedChip: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  chipText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedChipText: {
    color: 'white',
  },
});

export default CategoryList;
