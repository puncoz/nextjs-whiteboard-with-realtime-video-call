import { IsEmail, IsNotEmpty } from "class-validator"

export default class LoginFormSchema {
  @IsEmail({}, { message: "Please enter a valid email." })
  @IsNotEmpty({ message: "Please enter your email." })
  email: string
}
