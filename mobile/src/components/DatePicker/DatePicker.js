import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './DatePicker.styles';

function DatePickerWrapper({onChange, date}) {
  let datePicker = useRef();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          datePicker.current.onPressDate();
        }}>
        <View style={styles.dateView}>
          <View style={styles.dateText}>
            <Text>{date && moment(date).format('ll')}</Text>
          </View>
          <Icon name="date-range" color="grey" size={20} />
        </View>
      </TouchableOpacity>
      <DatePicker
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        maxDate={moment().add(100, 'year').format('YYYY-MM-DD')}
        minDate={moment().format('YYYY-MM-DD')}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        ref={datePicker}
        hideText
        showIcon={false}
        onDateChange={onChange}
      />
    </>
  );
}

DatePickerWrapper.propTypes = {
  onChange: PropTypes.func,
  date: PropTypes.string,
};

DatePickerWrapper.defaultProps = {
  onChange: () => {},
  date: null,
};

export default DatePickerWrapper;
