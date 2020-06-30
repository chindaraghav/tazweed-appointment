import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './Home';
import BookingScreen from './Booking';
import SearchScreen from './Search';
import Login from './Login';
import Register from './Register';

import {UserTokenUtil} from '../utils/services';
import {ActivityIndicator} from '../components';

const Stack = createStackNavigator();

console.disableYellowBox = true;

function Root() {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const checkAuth = async () => {
    await new UserTokenUtil().isLoggedIn();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return <ActivityIndicator open />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn === null && <Stack.Screen name="Auth" component={Auth} />}
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;
