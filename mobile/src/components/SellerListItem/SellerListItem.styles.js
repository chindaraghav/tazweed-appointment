import {StyleSheet} from 'react-native';

const profileIconSize = 60;
const profileImageStyle = {
  height: profileIconSize,
  width: profileIconSize,
  borderRadius: profileIconSize / 2,
};

export default StyleSheet.create({
  root: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  imageContainer: {
    ...profileImageStyle,
  },
  imageStyle: {
    ...profileImageStyle,
    borderWidth: 2,
    borderColor: 'white',
  },
  info: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  textInfo: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'grey',
  },
  infoContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
});
