const ROLES_ENUM = {
  BUYER: 'buyer',
  SELLER: 'seller',
};

const roles = Object.values(ROLES_ENUM);

const roleRights = new Map();
roleRights.set(ROLES_ENUM.BUYER, ['getUsers', 'searchUsers', 'createAppointment', 'getAppointment', 'getSlots']);

roleRights.set(ROLES_ENUM.SELLER, [
  'getUsers',
  'searchUsers',
  'createSlot',
  'acceptAppointment',
  'rejectAppointment',
  'getAppointment',
  'getSlots',
]);

module.exports = {
  roles,
  roleRights,
  ROLES_ENUM,
};
