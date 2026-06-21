/** Static copy and option lists for login / register flows (SRS AUTH-001, AUTH-003, AUTH-007). */

export const AUTH_TAGLINE = 'Strategically Growing for YOU';

export const AUTH_BRAND_BULLETS = [
  '8 exclusive global dental brands',
  '27 governorates nationwide',
  '2,000+ dentists supported',
] as const;

export const USER_ROLES = [
  { value: 'DENTIST', label: 'Dentist' },
  { value: 'CLINIC_OWNER', label: 'Clinic owner' },
  { value: 'PROCUREMENT_MANAGER', label: 'Procurement manager' },
  { value: 'ASSISTANT', label: 'Dental assistant' },
] as const;

/** Egypt's 27 governorates — canonical register dropdown list. */
export const EGYPT_GOVERNORATES = [
  'Alexandria',
  'Aswan',
  'Asyut',
  'Beheira',
  'Beni Suef',
  'Cairo',
  'Dakahlia',
  'Damietta',
  'Fayoum',
  'Gharbia',
  'Giza',
  'Ismailia',
  'Kafr El Sheikh',
  'Luxor',
  'Matrouh',
  'Menofia',
  'Minya',
  'New Valley',
  'North Sinai',
  'Port Said',
  'Qalyubia',
  'Qena',
  'Red Sea',
  'Sharqia',
  'Sohag',
  'South Sinai',
  'Suez',
] as const;

export const VERIFICATION_TYPES = [
  { value: 'SYNDICATE_ID', label: 'Dental syndicate ID' },
  { value: 'DENTAL_LICENSE', label: 'Dental practice license' },
] as const;

export const AUTH_FILE_RULES = {
  maxBytes: 5 * 1024 * 1024,
  accept: '.jpg,.jpeg,.png,.pdf',
  mimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
} as const;

export const AUTH_COPY = {
  login: {
    title: 'Welcome back',
    lead: 'Access your clinic profile, saved specifications, and order history.',
    submit: 'Log in',
    forgot: 'Forgot password?',
    forgotHint: 'Password reset launches with full auth — contact support@md-dental.com for now.',
    switch: 'Create an account',
    rateLimit: 'Too many attempts. Please wait 15 minutes before trying again.',
    invalid: 'Email or password is incorrect. Please try again.',
  },
  register: {
    title: 'Register your clinic',
    lead: 'Join Egypt\'s trusted dental distribution network — one account for mddental.com and future shop access.',
    steps: ['Account', 'Clinic', 'Verification'],
    continue: 'Continue',
    submit: 'Submit registration',
    switch: 'Already have an account?',
    successTitle: 'Check your email',
    successLead:
      'We sent a verification link to your inbox. Confirm your email, then our team will review your professional documents.',
    browse: 'Browse products while you wait',
    pdplNotice:
      'Uploaded documents may contain personal data protected under Egyptian PDPL (Law No. 151 of 2020). Files are stored securely and reviewed only by authorized MD Dental staff.',
  },
} as const;
