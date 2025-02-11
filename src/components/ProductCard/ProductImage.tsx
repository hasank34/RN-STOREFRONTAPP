import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {getImageUrl} from '../../utils/imageHelper';

interface ProductImageProps {
  imageUrl: string;
  isLiked: boolean;
  onLike: (e: any) => void;
  cardWidth: number;
}

const ProductImage = ({imageUrl, isLiked, onLike, cardWidth}: ProductImageProps) => (
  <View style={styles.imageContainer}>
    <Card.Cover
      source={{
        uri: getImageUrl(imageUrl),
        headers: {Accept: '*/*'},
      }}
      style={[styles.image, {height: cardWidth}]}
    />
    <IconButton
      icon={isLiked ? 'heart' : 'heart-outline'}
      iconColor={isLiked ? '#FF0000' : 'lightgray'}
      size={24}
      onPress={onLike}
      style={styles.likeButton}
    />
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  likeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    margin: 0,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'transparent',
  },
});

export default ProductImage;