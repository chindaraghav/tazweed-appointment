import {StyleSheet} from 'react-native';

const circleSize = 50;
export default StyleSheet.create({
  root: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  listContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },

  searchIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: '#2980B9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height: circleSize - 26,
    width: circleSize - 26,
    marginLeft: 3,
    tintColor: 'white',
  },
});
