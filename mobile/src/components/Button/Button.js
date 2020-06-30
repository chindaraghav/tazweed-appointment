import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

const Button = ({mode, style, children, ...props}) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: '#d3d3d3'},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}>
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

Button.propTypes = {
  mode: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element,
};

Button.defaultProps = {
  mode: '',
  style: {},
  children: null,
};

export default Button;
