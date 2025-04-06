import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string

  @Column()
  @IsString()
  @IsNotEmpty()
  lastName: string
}
