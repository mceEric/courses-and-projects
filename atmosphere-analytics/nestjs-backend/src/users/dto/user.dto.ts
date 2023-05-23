import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password requires a minimum length of 8' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))/, {
    message: 'Password too weak',
  })
  password: string;
}
