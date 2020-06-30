import {StyleSheet} from 'react-native';

const profileIconSize = 112;
const profileImageStyle = {
  height: profileIconSize,
  width: profileIconSize,
  borderRadius: profileIconSize / 2,
};
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    ...profileImageStyle,
    marginBottom: 25,
  },
  imageStyle: {
    ...profileImageStyle,
    borderWidth: 2,
    borderColor: 'white',
  },
  c1: {
    flex: 1,
    backgroundColor: '#2980B9',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 34,
  },
  c1Name: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
  },
  c2: {
    flex: 2,
    width: '100%',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  t1: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  dateContainer: {
    width: '100%',
    marginTop: 25,
  },
  label: {
    fontSize: 16,
    color: 'grey',
  },
});
