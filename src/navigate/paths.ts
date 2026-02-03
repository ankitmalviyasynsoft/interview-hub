const paths = {
  home: () => '/',
  customers: () => '/',

  // Auth
  auth: () => '/auth',
  signIn: () => `${paths.auth()}/sign-in`,
  signUp: () => `${paths.auth()}/sign-up`,
  forgotPassword: () => `${paths.auth()}/forgot-password`,
  resetPassword: () => `${paths.auth()}/reset-password`,
  siteMap: () => '/site-map',
  // Customer
  customerProfile: () => '/users/profile',

  // Admin
  admin: {
    dashboard: () => '/admin/dashboard',
    question: {
      root: () => '/admin/question',
      add: () => '/admin/question/add',
      edit: (id: string) => `/admin/question/edit/${id}`,
    },
    company: {
      root: () => '/admin/company',
      add: () => '/admin/company/add',
      edit: (id: string) => `/admin/company/edit/${id}`,
    },
    categories: {
      root: () => '/admin/categories',
      add: () => '/admin/categories/add',
      edit: (id: string) => `/admin/categories/edit/${id}`,
    },
    users: () => '/admin/users',
    settings: () => '/admin/settings',
    blogs: {
      root: () => '/admin/blogs',
      add: () => '/admin/blogs/add',
      edit: (id: string) => `/admin/blogs/edit/${id}`,
    },
  },

  // Staff Member
  staffMember: {
    dashboard: () => '/staff-member/dashboard',
    question: {
      root: () => '/staff-member/question',
      add: () => '/staff-member/question/add',
      edit: (id: string) => `/staff-member/question/edit/${id}`,
    },
    company: {
      root: () => '/staff-member/company',
      add: () => '/staff-member/company/add',
      edit: (id: string) => `/staff-member/company/edit/${id}`,
    },
    categories: {
      root: () => '/staff-member/categories',
      add: () => '/staff-member/categories/add',
      edit: (id: string) => `/staff-member/categories/edit/${id}`,
    },
    settings: () => '/staff-member/settings',
  },
}

export default paths
