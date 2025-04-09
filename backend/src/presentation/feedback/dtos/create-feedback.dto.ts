import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator'

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  comment: string

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number

  @IsInt()
  userId: number
}
