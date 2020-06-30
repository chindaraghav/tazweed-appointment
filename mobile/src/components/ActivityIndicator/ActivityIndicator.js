import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import styles from './ActivityIndicator.styles';

function ActivityIndicatorView({open}) {
  if (!open) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={open}
        color="white"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
}

export default ActivityIndicatorView;
