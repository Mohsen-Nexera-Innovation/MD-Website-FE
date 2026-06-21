import { describe, expect, it } from 'vitest';
import {
  isValidEmail,
  isValidPassword,
  isValidEgyptPhone,
  validateLogin,
  validateRegisterAccount,
  validateRegisterClinic,
  validateRegisterVerification,
} from '@/lib/auth-validation';

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('dr@clinic.com')).toBe(true);
  });
  it('rejects invalid emails', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });
});

describe('validateLogin', () => {
  it('requires email and password', () => {
    const errors = validateLogin({ email: '', password: '' });
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});

describe('validateRegisterAccount', () => {
  it('passes with valid account fields', () => {
    const errors = validateRegisterAccount({
      firstName: 'Amira',
      lastName: 'Hassan',
      email: 'amira@clinic.com',
      password: 'securepass',
      role: 'DENTIST',
    });
    expect(Object.keys(errors).length).toBe(0);
  });
});

describe('validateRegisterClinic', () => {
  it('requires governorate and valid phone', () => {
    const errors = validateRegisterClinic({
      clinicName: 'Cairo Dental',
      governorate: '',
      city: 'Cairo',
      phone: '123',
    });
    expect(errors.governorate).toBeDefined();
    expect(errors.phone).toBeDefined();
  });

  it('accepts Egyptian phone lengths', () => {
    expect(isValidEgyptPhone('01012345678')).toBe(true);
  });
});

describe('validateRegisterVerification', () => {
  it('requires file and type', () => {
    const errors = validateRegisterVerification({ verificationType: '', file: null });
    expect(errors.verificationType).toBeDefined();
    expect(errors.file).toBeDefined();
  });
});

describe('isValidPassword', () => {
  it('requires 8+ characters', () => {
    expect(isValidPassword('short')).toBe(false);
    expect(isValidPassword('longenough')).toBe(true);
  });
});
