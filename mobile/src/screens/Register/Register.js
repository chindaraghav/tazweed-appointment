import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity, Text, View} from 'react-native';
import {Header, Button, TextInput, ActivityIndicator} from '../../components';
import {nameValidator, emailValidator} from '../../utils/helpers';

import {useApiService} from '../../hooks';
import {RegisterService} from '../../utils/services';

import styles from './Register.styles';

const Register = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});
  const {handleSave, state, resetSave} = useApiService({}, RegisterService);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const {isLoading, isSuccess, isError, error} = state;

  const onRegisterPressed = () => {
    const emailError = emailValidator(email.value);
    const nameError = nameValidator(name.value);

    if (emailError || nameError) {
      setEmail({...email, error: emailError});
      setName({...name, error: nameError});
      return;
    }
    handleSave({email: email.value, name: name.value});
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      isSuccess && navigation.navigate('Home');
    }
  }, [isSuccess, isLoggedIn]);

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.root}>
      <Header onBackIconPress={goBack} title="Register" showBackIcon />
      <View style={styles.fieldContainer}>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => {
            isError && resetSave();
            setName({value: text, error: ''});
          }}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="none"
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => {
            isError && resetSave();
            setEmail({value: text, error: ''});
          }}
          error={!!email.error || isError}
          errorText={email.error || error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Button mode="contained" onPress={onRegisterPressed}>
          Register
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Have an account? </Text>
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.link}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ActivityIndicator open={isLoading} />
    </View>
  );
};

export default Register;
