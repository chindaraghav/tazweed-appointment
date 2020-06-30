import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import {
  Header,
  ActivityIndicator,
  SellerList,
  SearchBox,
} from '../../components';

import debounce from 'lodash/debounce';
import useSearchRedux from './useSearchRedux';
import styles from './Search.styles';
import {getText} from '../../utils/helpers';

function Search({navigation}) {
  const [searchText, setSearchText] = useState('');
  const {state, actions} = useSearchRedux();

  const {sellerList, isLoading, error} = state;
  const {searchSeller} = actions;

  const debounceSearchSeller = useRef(
    debounce((name) => {
      !!name && searchSeller(name);
    }, 500),
  );
  const changeText = (text) => {
    setSearchText(text);
    debounceSearchSeller.current(text);
  };
  const navigateTo = useCallback(
    (screen) => (params = {}) => {
      navigation.navigate(screen, params);
    },
    [navigation],
  );

  useEffect(() => {
    error && error;
  }, [error]);

  return (
    <View style={styles.container}>
      <Header
        title={'Search'}
        onBackIconPress={() => {
          navigation.goBack();
        }}
      />
      <SearchBox onChangeText={changeText} value={searchText || ''} />
      <View style={styles.listContainer}>
        <SellerList
          data={sellerList}
          emptyDataMessage={getText('labels.search_for_seller')}
          onSellerPress={navigateTo('Booking')}
        />
      </View>
      <ActivityIndicator open={isLoading} />
    </View>
  );
}

export default Search;
