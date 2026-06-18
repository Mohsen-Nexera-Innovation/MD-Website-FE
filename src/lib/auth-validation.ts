export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPassword(value: string): boolean {
  return value.length >= 8;
}

export function isValidEgyptPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

export function isAllowedVerificationFile(file: File): boolean {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
  return allowed.includes(file.type) && file.size <= 5 * 1024 * 1024;
}

export type LoginFields = { email: string; password: string };

export function validateLogin(fields: LoginFields): Partial<Record<keyof LoginFields, string>> {
  const errors: Partial<Record<keyof LoginFields, string>> = {};
  if (!fields.email.trim()) errors.email = 'Email is required.';
  else if (!isValidEmail(fields.email)) errors.email = 'Enter a valid email address.';
  if (!fields.password) errors.password = 'Password is required.';
  return errors;
}

export type RegisterAccountFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export function validateRegisterAccount(
  fields: RegisterAccountFields,
): Partial<Record<keyof RegisterAccountFields, string>> {
  const errors: Partial<Record<keyof RegisterAccountFields, string>> = {};
  if (!fields.firstName.trim()) errors.firstName = 'First name is required.';
  if (!fields.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!fields.email.trim()) errors.email = 'Email is required.';
  else if (!isValidEmail(fields.email)) errors.email = 'Enter a valid email address.';
  if (!fields.password) errors.password = 'Password is required.';
  else if (!isValidPassword(fields.password)) errors.password = 'Use at least 8 characters.';
  if (!fields.role) errors.role = 'Select your role.';
  return errors;
}

export type RegisterClinicFields = {
  clinicName: string;
  governorate: string;
  city: string;
  phone: string;
};

export function validateRegisterClinic(
  fields: RegisterClinicFields,
): Partial<Record<keyof RegisterClinicFields, string>> {
  const errors: Partial<Record<keyof RegisterClinicFields, string>> = {};
  if (!fields.clinicName.trim()) errors.clinicName = 'Clinic name is required.';
  if (!fields.governorate) errors.governorate = 'Select a governorate.';
  if (!fields.city.trim()) errors.city = 'City is required.';
  if (!fields.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!isValidEgyptPhone(fields.phone)) errors.phone = 'Enter a valid Egyptian phone number.';
  return errors;
}

export type RegisterVerificationFields = {
  verificationType: string;
  file: File | null;
};

export function validateRegisterVerification(
  fields: RegisterVerificationFields,
): Partial<Record<keyof RegisterVerificationFields, string>> {
  const errors: Partial<Record<keyof RegisterVerificationFields, string>> = {};
  if (!fields.verificationType) errors.verificationType = 'Select a document type.';
  if (!fields.file) errors.file = 'Upload your professional document.';
  else if (!isAllowedVerificationFile(fields.file)) {
    errors.file = 'Use JPG, PNG, or PDF up to 5 MB.';
  }
  return errors;
}
