const paths = {
  customers: () => '/',
  admin: () => '/admin',
  staffMember: () => '/staff-member',
  auth: () => '/auth',

  signIn: () => `${paths.auth()}/sign-in`,
  signUp: () => `${paths.auth()}/sign-up`,
  forgotPassword: () => `${paths.auth()}/forgot-password`,
  resetPassword: () => `${paths.auth()}/reset-password`,

  customerProfile: () => '/profile',
}

export default paths
