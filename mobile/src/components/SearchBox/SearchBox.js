import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native';
import styles from './SearchBox.styles';

function SearchBox({onChangeText, value}) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TextInput
          autoCapitalize={false}
          style={styles.inputBox}
          value={value}
          onChangeText={onChangeText}
          placeholder={'Search'}
        />
      </View>
    </View>
  );
}

SearchBox.propTypes = {
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

SearchBox.defaultProps = {
  onChangeText: () => {},
  value: '',
};

export default SearchBox;
