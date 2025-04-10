// src/domain/exceptions/invalid-feedback.exception.ts
export class InvalidFeedbackException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidFeedbackException'
  }
}
