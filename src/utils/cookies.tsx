// Auth Cookie
export const getAuthCookie = () =>
  document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

export const createAuthCookie = (token: string) =>
  (document.cookie = `token=${token}; Path=/; Secure; SameSite=Strict;`);

export const removeAuthCookie = () =>
  (document.cookie =
    'token=; Path=/; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:01 GMT;');
