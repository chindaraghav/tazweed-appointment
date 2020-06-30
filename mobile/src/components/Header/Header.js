import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useSelector} from 'react-redux';
import {UserTokenUtil} from '../../utils/services';

import styles from './Header.styles';

function Header({title, onBackIconPress, showBackIcon}) {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const userTokenUtil = useRef(new UserTokenUtil());
  return (
    <View style={styles.container}>
      {showBackIcon ? (
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={onBackIconPress}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {isLoggedIn ? (
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={userTokenUtil.current.logout}>
          <Icon name="exit-to-app" size={24} color="white" />
        </TouchableOpacity>
      ) : null}
      {}
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  onBackIconPress: PropTypes.func,
  showBackIcon: PropTypes.bool,
};

Header.defaultProps = {
  title: '',
  onBackIconPress: () => {},
  showBackIcon: true,
};

export default Header;
