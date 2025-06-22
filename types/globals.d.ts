export {}

// Create a type for the roles
export type Roles = 'admin' | 'resident'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
      onboardingComplete?:boolean
      isAdminApproved?:boolean
    }
  }
}