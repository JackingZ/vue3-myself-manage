const organizer = [
  {
    path: '/organzier',
    name: 'organzier',
    meta: {
      roles: ['organzier']
    },
    children: [
      {
        path: '/role',
        name: 'role',
        meta: {
          roles: ['role']
        }
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          roles: ['user']
        }
      },
      {
        path: '/company',
        name: 'company',
        meta: {
          roles: ['company']
        }
      }
    ]
  }
]

export default organizer