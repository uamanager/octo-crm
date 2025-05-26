import { ServerApiAuthService } from './auth.api.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthSignUpResponseDto } from './dto/sigh-up.response.dto';
import { AuthSignUpRequestDtoBody } from './dto/sigh-up.request.dto';
import { AuthSignInRequestDtoBody } from './dto/sigh-in.request.dto';
import { AuthSignInResponseDto } from './dto/sigh-in.response.dto';
import { PublicApi, ResponseDto } from '@octo-crm/server-core';

@ApiTags('auth')
@Controller('auth')
export class ServerApiAuthController {
  constructor(private readonly $_authApiService: ServerApiAuthService) {}

  @ApiOperation({
    summary: 'User Sign In',
    description: 'Allows users to sign in and get an access token.',
  })
  @ApiOkResponse({
    description: 'Authorized. The user is authenticated and an access token is returned.',
    type: AuthSignInResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Exception. Auth credentials are invalid.',
    type: ResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Exception. Invalid email or password.',
    type: ResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @PublicApi()
  @Post('sign-in')
  signIn(@Body() body: AuthSignInRequestDtoBody): Promise<AuthSignInResponseDto> {
    return this.$_authApiService.signIn(body);
  }

  @ApiOperation({
    summary: 'User Sign Up',
    description: 'Allows users to sign up.',
  })
  @ApiOkResponse({
    description: 'Sign up successful. A new user account has been created.',
    type: AuthSignUpResponseDto,
  })
  @ApiConflictResponse({
    description: 'Conflict Exception. An account with the same email already exists.',
    type: ResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Exception. Auth credentials are invalid.',
    type: ResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @PublicApi()
  @Post('sign-up')
  signUp(@Body() body: AuthSignUpRequestDtoBody): Promise<AuthSignUpResponseDto> {
    return this.$_authApiService.signUp(body);
  }
}
