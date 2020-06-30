import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity, Text, View} from 'react-native';

import {Header, Button, TextInput, ActivityIndicator} from '../../components';

import {emailValidator} from '../../utils/helpers';
import {LoginService} from '../../utils/services';
import {useApiService} from '../../hooks';

import styles from './Login.styles';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const {handleSave, state, resetSave} = useApiService({}, LoginService);

  const {isLoading, isSuccess, isError, error} = state;

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    handleSave({email: email.value});
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      isSuccess && navigation.navigate('Home');
    }
  }, [isSuccess, isLoggedIn]);

  return (
    <View style={styles.root}>
      <Header title="Login" showBackIcon={false} />
      <View style={styles.fieldContainer}>
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
        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ActivityIndicator open={isLoading} />
    </View>
  );
};

export default LoginScreen;
