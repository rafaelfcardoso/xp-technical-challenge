import { Type, Static } from '@sinclair/typebox';

// Login schemas
export const LoginBodySchema = Type.Object({
  username: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 })
});

export const LoginResponseSchema = Type.Object({
  token: Type.String()
});

export const ErrorResponseSchema = Type.Object({
  message: Type.String()
});

// Static types
export type LoginBody = Static<typeof LoginBodySchema>;
export type LoginResponse = Static<typeof LoginResponseSchema>;
export type ErrorResponse = Static<typeof ErrorResponseSchema>;