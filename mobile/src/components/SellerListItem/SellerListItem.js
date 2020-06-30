import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Avatar from '../Avatar';

import styles from './SellerListItem.styles';

function SellerListItem({name, email, onPress}) {
  return (
    <TouchableOpacity style={styles.info} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Avatar
          containerStyle={styles.imageContainer}
          imageStyle={styles.imageStyle}
          avatarUri="user_icon"
        />
        <View style={styles.textInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <Icon size={32} name="chevron-right" color="#d3d3d3" />
    </TouchableOpacity>
  );
}

SellerListItem.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  onPress: PropTypes.func,
};

SellerListItem.defaultProps = {
  name: '',
  email: '',
  onPres: () => {},
};

export default SellerListItem;
