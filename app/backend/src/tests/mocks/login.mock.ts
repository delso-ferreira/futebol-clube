const validLogins = [
    {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        // senha: secret_admin
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
        // senha: secret_user
    },    
  ];

  const invalidEmail =
    {
      email: '@exemplo.com',
      password: 'secret_admin',
    }
   /*  {
      email: 'exemplo@.com',
      password: 'secret_admin',
    },
    {
      email: 'exemplo@exemplo',
      password: 'secret_admin',
    },
    {
      email: 'exemplo@.com',
      password: 'secret_admin',
    },
    {
      email: 'exemplo.exemplo.com',
      password: 'secret_admin',
    },
    {
      email: 'user@user.com',
      password: 'xablauzin',
    },
    {
      email: 'admin@admin.com',
      password: undefined,
    },
    {
      email: 'admin@admin.com',
      password: '123456',
    },
    {
      email: 'admin@admin.com',
      password: 'secret_admi',
    },    */
  
    const invalidPassword = {
        email: 'admin@admin.com',
        password: '123456',
      }
export default {
    validLogins,
    invalidEmail,
    invalidPassword,
}