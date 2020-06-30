import React from 'react';
import { ActivityLoader } from '../components';
import { loadable } from '../utils/helpers';

// Login
export const Login = loadable(() => import('./Login'), {
    fallback: <ActivityLoader open />,
  });

// SignUp
export const SignUp = loadable(() => import('./SignUp'), {
    fallback: <ActivityLoader open />,
  });

// Home
export const Home = loadable(() => import('./Home'), {
    fallback: <ActivityLoader open />,
  });

// CreateSlot
export const CreateSlot = loadable(() => import('./CreateSlot'), {
    fallback: <ActivityLoader open />,
  });