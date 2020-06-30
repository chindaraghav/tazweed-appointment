import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';

const TextInput = ({errorText, ...props}) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={'#d3d3d3'}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

TextInput.propTypes = {
  errorText: PropTypes.string,
};

TextInput.defaultProps = {
  errorText: '',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {},
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
