import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator'

export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  comment?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number
}
