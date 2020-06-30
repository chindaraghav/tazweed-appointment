import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import SellerListItem from '../SellerListItem';

const NoData = ({text}) => {
  return (
    <View style={styles.noDataRoot}>
      <Text style={styles.noDataText}>{text}</Text>
    </View>
  );
};

function SellerList({data, onEndReached, onSellerPress, emptyDataMessage}) {
  if (data === null) {
    return <NoData text={emptyDataMessage} />;
  }
  if (!data.length) {
    return <NoData text="No Seller Found" />;
  }
  const onItemPress = (itemData) => () => {
    onSellerPress(itemData);
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      renderItem={({item: {name, email, id} = {}}) => (
        <SellerListItem
          name={name}
          email={email}
          onPress={onItemPress({id, name})}
        />
      )}
      keyExtractor={(item) => item.id}
      extraData={data}
    />
  );
}

SellerList.propTypes = {
  data: PropTypes.array,
  onEndReached: PropTypes.func,
  onSellerPress: PropTypes.func,
  emptyDataMessage: PropTypes.string,
};

SellerList.defaultProps = {
  data: null,
  onEndReached: () => {},
  onSellerPress: () => {},
  emptyDataMessage: '',
};

const styles = StyleSheet.create({
  noDataRoot: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noDataText: {fontSize: 32, color: '#d3d3d3', fontWeight: '600'},
});

export default SellerList;
