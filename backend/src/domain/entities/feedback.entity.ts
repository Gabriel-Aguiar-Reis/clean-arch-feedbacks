export class Feedback {
  constructor(
    public readonly id: number,
    public readonly comment: string,
    public readonly rating: number,
    public readonly userId: number
  ) {}
}
