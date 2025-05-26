import { ServerApiProjectService } from './project.api.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrivateApi } from '@octo-crm/server-core';
import { ProjectSearchRequestDtoQuery } from './dto/search.request.dto';
import { ProjectSearchResponseDto } from './dto/search.response.dto';
import { ProjectCreateResponseDto } from './dto/create.response.dto';
import { ProjectCreateRequestDtoBody } from './dto/create.request.dto';
import { ProjectDeleteRequestDtoParams } from './dto/delete.request.dto';
import { ProjectDeleteResponseDto } from './dto/delete.response.dto';
import { ProjectRefreshRequestDtoParams } from './dto/refresh.request.dto';
import { ProjectRefreshResponseDto } from './dto/refresh.response.dto';

@ApiTags('project')
@Controller('project')
export class ServerApiProjectController {
  constructor(private readonly $_projectApiService: ServerApiProjectService) {}

  @ApiOperation({
    summary: 'Search projects',
    description: 'Allows users to search projects',
  })
  @ApiOkResponse({
    description: 'Projects are found',
    type: ProjectSearchResponseDto,
  })
  @PrivateApi()
  @Get()
  async search(
    @Query() query: ProjectSearchRequestDtoQuery,
  ): Promise<ProjectSearchResponseDto> {
    return this.$_projectApiService.search(query);
  }

  @ApiOperation({
    summary: 'Create a new project',
    description: 'Allows users to create a new project',
  })
  @ApiOkResponse({
    description: 'Project created',
    type: ProjectCreateResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @PrivateApi()
  @Post()
  async create(
    @Body() body: ProjectCreateRequestDtoBody,
  ): Promise<ProjectCreateResponseDto> {
    return this.$_projectApiService.create(body);
  }

  @ApiOperation({
    summary: 'Delete a project',
    description: 'Allows users to delete a project',
  })
  @ApiOkResponse({
    description: 'Project deleted',
    type: ProjectDeleteResponseDto,
  })
  @PrivateApi()
  @Delete(':id')
  async delete(
    @Param() params: ProjectDeleteRequestDtoParams,
  ): Promise<ProjectDeleteResponseDto> {
    return this.$_projectApiService.delete(params);
  }

  @ApiOperation({
    summary: 'Refresh a project',
    description: 'Allows users to refresh a project',
  })
  @ApiOkResponse({
    description: 'Projects refreshed',
    type: ProjectRefreshResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @PrivateApi()
  @Post('refresh/:id')
  async refresh(
    @Param() params: ProjectRefreshRequestDtoParams,
  ): Promise<ProjectRefreshResponseDto> {
    return this.$_projectApiService.refresh(params);
  }
}
