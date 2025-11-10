export const paths = {
  auth: '/auth',
  admin: '/admin',
  user: '/user',
  provider: '/provider',
  client: '/client',
  consultant: '/consultant',

  // Project paths public
  home: () => '/',
  howItWorks: () => '/how-it-works',
  findExperts: () => '/find-experts',
  forExperts: () => '/for-experts',
  pricing: () => '/pricing',
  about: () => '/about',
  contact: () => '/contact',
  faq: () => '/faq',
  support: () => '/support',
  privacy: () => '/privacy',
  terms: () => '/terms',
  recruitment: () => '/recruitment',

  // Project paths authenticate
  login: () => `${paths.auth}/login`,
  signup: () => `${paths.auth}/signup`,
  forgotPassword: () => `${paths.auth}/forgot-password`,
  resetPassword: () => `${paths.auth}/reset-password`,
  registrationSuccess: (email?: string) => (email ? `${paths.auth}/registration-success?email=${encodeURIComponent(email)}` : `${paths.auth}/registration-success`),

  // Project paths users

  // Project paths admin
  adminDashboard: () => `${paths.admin}/dashboard`,
  adminConsultants: () => `${paths.admin}/consultants`,
  adminUsers: () => `${paths.admin}/users`,
  adminUserDetail: (id: number) => `${paths.admin}/user-detail/${id}`,

  // Project paths consultant
  consultantDashboard: () => `${paths.consultant}/dashboard`,
  consultantProfile: () => `${paths.consultant}/profile`,
  consultantSlots: () => `${paths.consultant}/sessions`,
  consultantMyBookings: () => `${paths.consultant}/my-bookings`,
  // Project paths user
  userDashboard: () => `${paths.user}/dashboard`,
  userProfile: () => `${paths.user}/profile`,
  userMySessions: () => `${paths.user}/my-sessions`,
  userConsultants: () => `${paths.user}/consultants`,
  userConsultantsSlots: (id: number) => `/slots/${id}`,
  userViewProfile: (id: number) => `/view-profile/${id}`,
}
