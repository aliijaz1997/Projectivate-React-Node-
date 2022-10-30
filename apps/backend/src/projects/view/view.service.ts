import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import {
  CreateViewDto,
  CreateViewDtoRes,
  DeleteViewDtoRes,
  GENERIC_VIEW_CONSTANT,
  View,
} from '@projectivate/common';
import { Prisma } from '@prisma/client';
import { UpdateCurrentViewDto } from './dto/updateView.dto';

@Injectable()
export class ViewService {
  constructor(private readonly prisma: PrismaService) {}
  async create({
    createViewDto,
    projectId,
  }: {
    createViewDto: CreateViewDto;
    projectId: string;
  }): Promise<CreateViewDtoRes> {
    const { filters, groupings, name } = createViewDto;

    const createdView = await this.prisma.view.create({
      data: {
        name,
        projectId,
        filters: filters as unknown as Prisma.JsonValue,
        groupings: groupings as unknown as Prisma.JsonValue,
      },
    });
    return createdView as unknown as CreateViewDtoRes;
  }

  async getAllViews(projectId: string): Promise<View[]> {
    const allViews = await this.prisma.view.findMany({ where: { projectId } });
    // forcing it to register as our entity view type which has correct typings
    return allViews as unknown as View[];
  }

  async deleteView({
    viewId,
    projectId,
  }: {
    viewId: string;
    projectId: string;
  }): Promise<DeleteViewDtoRes> {
    const viewToBeDeleted = await this.prisma.view.findUnique({
      where: { id: viewId },
    });
    if (viewToBeDeleted.projectId !== projectId)
      throw new ForbiddenException(
        'you are not authorized to delete this view',
      );

    if (viewToBeDeleted.name === GENERIC_VIEW_CONSTANT) {
      throw new BadRequestException('Default view can not be deleted');
    }
    const deletedView = await this.prisma.view.delete({
      where: { id: viewId },
    });

    return deletedView as unknown as CreateViewDtoRes;
  }

  async changeCurrentView({
    projectId,
    updateViewDto,
  }: {
    projectId: string;
    updateViewDto: UpdateCurrentViewDto;
  }) {
    const { currentView } = updateViewDto;
    return await this.prisma.project.update({
      where: { id: projectId },
      data: { currentView },
    });
  }
}
