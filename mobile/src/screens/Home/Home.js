import React, {useEffect, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {Header, ActivityIndicator, SellerList} from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {usePagination} from '../../hooks';
import useHomeRedux from './useHomeRedux';

import styles from './Home.styles';

function HomeScreen(props) {
  const {navigation = {}} = props;
  const {state, actions} = useHomeRedux();
  const {page, fetchMoreData} = usePagination();

  const {sellerList, isEndReached, isLoading, error} = state;
  const {getUsers} = actions;

  const navigateTo = useCallback(
    (screen) => (params = {}) => {
      navigation.navigate(screen, params);
    },
    [],
  );

  const onEndReached = useCallback(() => {
    !isEndReached && fetchMoreData();
  }, [isEndReached, fetchMoreData]);

  useEffect(() => {
    error && alert(error);
  }, [error]);

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <View style={styles.root}>
      <Header title="Home" showBackIcon={false} />
      <View style={styles.listContainer}>
        <SellerList
          data={sellerList}
          onEndReached={onEndReached}
          onSellerPress={navigateTo('Booking')}
        />
      </View>
      <TouchableOpacity
        onPress={navigateTo('Search')}
        style={styles.searchIconContainer}>
        <Icon name="search" size={32} color="white" />
      </TouchableOpacity>
      <ActivityIndicator open={isLoading} />
    </View>
  );
}

export default HomeScreen;
