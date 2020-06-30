import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980B9',
  },
  backIcon: {
    height: 18,
    width: 18,
  },
  backIconContainer: {
    position: 'absolute',
    left: 10,
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 24,
    color: 'white',
  },
  logoutContainer: {
    position: 'absolute',
    right: 20,
  },
});
