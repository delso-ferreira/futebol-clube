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

  const invalidLogins = [
    {
      username: 'Admin',
      role: 'admin',
      email: '@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        // senha: secret_admin
    },
    {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZ', 
        // senha: 123456
    },    
  ];

  const validLoginAcessMock = {
    id: 1,
    email: 'admin@admin.com',
    username: 'Admin',
    role: 'admin',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZXdpc2hhbWlsdG9uQGdtYWlsLmNvbSIsImlhdCI6MTY5NzUwNDA3NywiZXhwIjoxNjk5MjMyMDc3fQ.nOLPaNhB4DFtRh4rrmrPoEAdP4LrC8QzYNjDujCBY_Q'

  }  
  export default {
    validLogins,
    invalidLogins,
    validLoginAcessMock,
}