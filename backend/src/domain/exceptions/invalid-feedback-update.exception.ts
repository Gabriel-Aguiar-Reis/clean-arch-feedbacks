export class InvalidFeedbackUpdateException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidFeedbackUpdateException'
  }
}
