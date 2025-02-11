import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import {getImageUrl} from '../../utils/imageHelper';

const {width} = Dimensions.get('window');

interface ProductImageProps {
  imageUrl: string;
  isLiked: boolean;
  onLike: () => void;
  onBack: () => void;
}

const ProductImage = ({
  imageUrl,
  isLiked,
  onLike,
  onBack,
}: ProductImageProps) => (
  <View style={styles.imageContainer}>
    <Card.Cover
      source={{
        uri: getImageUrl(imageUrl),
        headers: {Accept: '*/*'},
      }}
      style={styles.image}
    />
    <View style={styles.imageOverlay}>
      <IconButton
        icon="arrow-left"
        iconColor="white"
        size={24}
        style={styles.backIcon}
        onPress={onBack}
      />
      <IconButton
        icon={isLiked ? 'heart' : 'heart-outline'}
        iconColor={isLiked ? '#FF0000' : 'lightgray'}
        size={24}
        onPress={onLike}
        style={styles.likeButton}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: width,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    zIndex: 1,
  },
  backIcon: {
    backgroundColor: '#64B5F6',
    borderRadius: 24,
    margin: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  likeButton: {
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'transparent',
    margin: 0,
  },
});

export default ProductImage;
