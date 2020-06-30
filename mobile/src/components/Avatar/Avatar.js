import React from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';

function Avatar({imageStyle, containerStyle, avatarUri}) {
  return (
    <View style={{...containerStyle}}>
      <Image source={{uri: avatarUri}} style={{...imageStyle}} />
    </View>
  );
}

Avatar.propTypes = {
  imageStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  avatarUri: PropTypes.string,
};

Avatar.defaultProps = {
  imageStyle: {},
  containerStyle: {},
  avatarUri: {},
};

export default Avatar;
