import messagesEN from '../../messages/en.json';
import get from 'lodash/get';

const getText = (key) => {
  return get(messagesEN, [key], key);
};

function getErrorMessage(error) {
  return get(
    error,
    'response.data.message',
    getText('error.something_went_wrong'),
  );
}

export {getText, getErrorMessage};
