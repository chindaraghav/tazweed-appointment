import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, Alert} from 'react-native';
import {
  Avatar,
  Header,
  ActivityIndicator,
  SlotList,
  DatePicker,
} from '../../components';

import {useForm, useApiService} from '../../hooks';
import {getText} from '../../utils/helpers';
import {GetSlotsService, CreateAppointmentService} from '../../utils/services';

import styles from './Booking.styles';

function Booking({navigation = {}, route = {params: {}}}) {
  const {inputs, handleInputChange} = useForm();
  const {id, name: sellerName} = route.params;
  const {forDate} = inputs;
  const buyerId = useSelector((state) => state.app.userId);

  const {state: slotsState, handleSave: requestSlot} = useApiService(
    {id, forDate},
    GetSlotsService,
  );
  const {state: appointmentState, handleSave, resetSave} = useApiService(
    {sellerId: id, buyerId},
    CreateAppointmentService,
  );
  const {isLoading: slotLoading, data: slots, error: slotError} = slotsState;
  const {
    isLoading: appointmentLoading,
    isSuccess: appointmentCreated,
    error: appointmentError,
  } = appointmentState;

  useEffect(() => {
    if (appointmentCreated) {
      alert(getText('messages.appointment_confirmed'));
      resetSave();
      requestSlot();
    }
  }, [appointmentCreated]);

  useEffect(() => {
    if (slotError || appointmentError) {
      alert(slotError || appointmentError);
    }
  }, [slotError, appointmentError]);

  const handleChange = (name) => (value) => {
    handleInputChange(name, value);
  };

  useEffect(() => {
    forDate && requestSlot();
  }, [forDate]);

  const onPressSlot = (slotId) => {
    Alert.alert(
      getText('messages.confirm_booking'),
      getText('messages.confirm_cooking_desc'),
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handleSave({slotId})},
      ],
      {cancelable: false},
    );
  };

  const isLoading = slotLoading || appointmentLoading;

  return (
    <View style={styles.container}>
      <Header
        title={'Booking'}
        onBackIconPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.c1}>
        <Avatar
          containerStyle={styles.imageContainer}
          imageStyle={styles.imageStyle}
          avatarUri="user_icon"
        />
        <Text style={styles.c1Name}>{sellerName}</Text>
      </View>
      <View style={styles.c2}>
        <Text style={styles.t1}>{getText('labels.book_appointment')}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Date</Text>
          <DatePicker date={forDate} onChange={handleChange('forDate')} />
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.label}>Time</Text>
          <View style={styles.flatlistContainer}>
            <SlotList data={slots} onSlotPress={onPressSlot} />
          </View>
        </View>
      </View>
      <ActivityIndicator open={isLoading} />
    </View>
  );
}

export default Booking;
