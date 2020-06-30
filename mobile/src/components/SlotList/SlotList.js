import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {formatDateToTime, getText} from '../../utils/helpers';

const NoData = ({text}) => {
  return (
    <View style={styles.noDataRoot}>
      <Text style={styles.noDataText}>{text}</Text>
    </View>
  );
};

function SlotList({data, onSlotPress}) {
  if (data === null) {
    return <NoData text={getText('messages.select_date_for_slots')} />;
  }
  if (!data.length) {
    return <NoData text={getText('messages.no_slot_available')} />;
  }
  const onItemPress = (itemData) => () => {
    onSlotPress(itemData);
  };
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      style={styles.listStyle}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={onItemPress(item.id)}
          style={styles.listItem}>
          <Text style={styles.timeText}>
            {`${formatDateToTime(item.fromTime)}\n - \n ${formatDateToTime(
              item.toTime,
            )}`}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      extraData={data}
    />
  );
}

SlotList.propTypes = {
  data: PropTypes.array,
  onSlotPress: PropTypes.func,
};

SlotList.defaultProps = {
  data: null,
  onSlotPress: () => {},
};

const styles = StyleSheet.create({
  noDataRoot: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
  noDataText: {textAlign: 'center', fontSize: 17},
  listItem: {
    marginRight: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#E1E1E6',
    borderRadius: 5,
  },
  timeText: {
    fontSize: 13,
    color: '#5F6A6A',
    textAlign: 'center',
  },
  listStyle: {
    marginTop: 16,
  },
});

export default SlotList;
