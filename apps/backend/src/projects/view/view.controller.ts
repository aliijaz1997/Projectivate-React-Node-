import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateViewDtoRes, DeleteViewDtoRes, View } from '@projectivate/common';
import { CreateDto } from './dto/createView.dto';
import { UpdateCurrentViewDto } from './dto/updateView.dto';
import { ViewService } from './view.service';

@ApiBearerAuth()
@ApiTags('Views')
@Controller('projects/:projectId')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @ApiResponse({
    type: CreateDto,
    description: 'Create View',
  })
  @Post('views')
  async create(
    @Body() createViewDto: CreateDto,
    @Param('projectId') projectId: string,
  ): Promise<CreateViewDtoRes> {
    return await this.viewService.create({ projectId, createViewDto });
  }

  @ApiResponse({
    type: [View],
    description: 'Get all Views',
  })
  @Get('views')
  async getAllViews(@Param('projectId') projectId: string): Promise<View[]> {
    return await this.viewService.getAllViews(projectId);
  }

  @Delete('views/:id')
  async delete(
    @Param('projectId') projectId: string,
    @Param('id') viewId: string,
  ): Promise<DeleteViewDtoRes> {
    return await this.viewService.deleteView({ projectId, viewId });
  }

  @Put('views/currentView')
  async update(
    @Param('projectId') projectId: string,
    @Body() updateViewDto: UpdateCurrentViewDto,
  ) {
    return this.viewService.changeCurrentView({ projectId, updateViewDto });
  }
}
