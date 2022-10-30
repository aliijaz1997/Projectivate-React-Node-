import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdminService } from '../common/services/firebase-admin/firebase-admin.service';
import { PrismaService } from '../common/services/prisma/prisma.service';
import { CreateTimeTrackDto } from './dto/create-time-track.dto';
import { UpdateTimeTrackDto } from './dto/update-time-track.dto';

@Injectable()
export class TimeTrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseAdmin: FirebaseAdminService,
  ) {}
  async start({
    createTimeTrackDto,
    taskId,
    userId,
  }: {
    createTimeTrackDto: CreateTimeTrackDto;
    taskId: string;
    userId: string;
  }) {
    const { startTime } = createTimeTrackDto;
    const timeTrack = await this.prisma.timeTrack.create({
      data: { taskId, userId, startDate: startTime },
    });
    return timeTrack;
  }
  async create({
    createTimeTrackDto,
    taskId,
    userId,
  }: {
    createTimeTrackDto: CreateTimeTrackDto;
    taskId: string;
    userId: string;
  }) {
    const { startTime, endTime } = createTimeTrackDto;
    const timeTrack = await this.prisma.timeTrack.create({
      data: { taskId, userId, startDate: startTime, endDate: endTime },
    });
    return timeTrack;
  }

  async findAll({ taskId, tenantId }: { taskId: string; tenantId: string }) {
    const totalTimeRecords = await this.prisma.timeTrack.findMany({
      where: { taskId },
    });
    const allUsers = await this.prisma.user.findMany({
      where: { tenants: { some: { tenantId } } },
    });
    const members = await this.firebaseAdmin.firebase
      .auth()
      .getUsers([...allUsers.map((a) => ({ email: a.email }))]);
    const usersWithName = members.users.map((m) => {
      return {
        id: m.uid,
        email: m.email,
        displayName: m.displayName,

        createdAt: new Date(m.metadata.creationTime),
        updatedAt: new Date(m.metadata.lastSignInTime),
      };
    });
    const recordsWithRespectiveUsers = await Promise.all(
      totalTimeRecords.map(async (tr) => {
        const { displayName } = await this.firebaseAdmin.firebase
          .auth()
          .getUser(tr.userId);
        return {
          ...tr,
          userName: displayName,
        };
      }),
    );
    return {
      timeRecords: recordsWithRespectiveUsers,
      users: usersWithName,
    };
  }

  async stop(
    taskId: string,
    updateTimeTrackDto: UpdateTimeTrackDto,
    userId: string,
  ) {
    const { endTime } = updateTimeTrackDto;
    const timerToBeUpdated = await this.prisma.timeTrack.findFirst({
      where: { taskId, endDate: null, userId },
    });
    if (!timerToBeUpdated) throw new UnauthorizedException();
    const timeTrack = await this.prisma.timeTrack.update({
      where: { id: timerToBeUpdated.id },
      data: { endDate: endTime },
    });
    return timeTrack;
  }

  async update(
    id: string,
    updateTimeTrackDto: UpdateTimeTrackDto,
    userId: string,
  ) {
    const timeToBeUpdated = await this.prisma.timeTrack.findUnique({
      where: { id },
    });
    if (timeToBeUpdated.userId !== userId) throw new UnauthorizedException();
    const { endTime, startTime } = updateTimeTrackDto;
    const update = await this.prisma.timeTrack.update({
      where: { id },
      data: { startDate: startTime, endDate: endTime },
    });
    return update;
  }

  async remove(id: string, userId: string) {
    const timeToBeDeleted = await this.prisma.timeTrack.findUnique({
      where: { id },
    });
    if (timeToBeDeleted.userId !== userId) throw new UnauthorizedException();
    const deletedTime = await this.prisma.timeTrack.delete({ where: { id } });
    return deletedTime;
  }
}
