import { IsString, IsNotEmpty, IsEmail ,MaxLength,IsNumberString, MinLength, IsOptional} from 'class-validator' ;

export class CreateUser{
     @IsNotEmpty()
     @IsString()
     @MaxLength(15, { message: 'Username must not exceed 15 characters' })
     first_name: string;

     @IsNotEmpty()
     @IsString()
     @MaxLength(15, { message: 'Username must not exceed 15 characters' })
     last_name: string;
   
     @IsNotEmpty()
     @IsEmail()
     email: string;

     @IsNotEmpty()
     @IsNumberString()
     phone_no : string ;
   
     @IsNotEmpty()
     @IsString()
     @MaxLength(15,{ message: 'Password must not exceed 15 characters' })
     @MinLength(5, { message : "Password must contain atleast 5 characters"})
     password: string;

     @IsNotEmpty()
     @IsString()
     iitk_address:string;
}


export class LoginUser{
     @IsNotEmpty()
     @IsEmail()
     email: string;

     @IsNotEmpty()
     @IsString()
     @MaxLength(15,{ message: 'Password must not exceed 15 characters' })
     @MinLength(5, { message : "Password must contain atleast 5 characters"})
     password: string;
}


export class DeleteUser{
     @IsNotEmpty()
     @IsString()
     @MaxLength(15,{ message: 'Password must not exceed 15 characters' })
     @MinLength(5, { message : "Password must contain atleast 5 characters"})
     password: string;
}


export class UpdateUser{
     @IsOptional()
     @IsString()
     @MaxLength(15, { message: 'Username must not exceed 15 characters' })
     first_name: string;

     @IsOptional()
     @IsString()
     @MaxLength(15, { message: 'Username must not exceed 15 characters' })
     last_name: string;
   

     @IsOptional()
     @IsNumberString()
     phone_no : string ;
   
     @IsOptional()
     @IsString()
     iitk_address:string;
}


