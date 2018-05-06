export const IsAllowedRole = (AllowedRoles, userRoles) => {
  return userRoles.some(role => AllowedRoles.includes(role));
};