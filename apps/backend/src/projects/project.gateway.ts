import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthGuard } from 'src/common/auth/socket-auth.guard';
import { SocketUserService } from '../common/services/user/getUserFromSocket.service';
import { ProjectsService } from './projects.service';

@UseGuards(SocketAuthGuard)
@WebSocketGateway()
export class ProjectGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketUserService: SocketUserService,
    private readonly projectService: ProjectsService,
  ) {}
  private logger: Logger = new Logger(ProjectGateway.name);
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.log('initialized', server);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`);
  }

  async handleConnection(socket: Socket) {
    await this.socketUserService.getUserFromSocket(socket);
  }

  @SubscribeMessage('projects:list')
  async getTasksDetails(
    @ConnectedSocket() socket: Socket,
    @MessageBody('tenantId') tenantId: string,
  ) {
    const user = await this.socketUserService.getUserFromSocket(socket);
    if (!user) throw new WsException('No user');
    const projects = await this.projectService.findAll({
      where: { tenantId },
    });
    socket.broadcast.emit('projects', { projects, channel: tenantId });
  }
  // @SubscribeMessage('projectTasks:list')
  // async getAllTasks(
  //   @ConnectedSocket() socket: Socket,
  //   @MessageBody('projectId') projectId: string,
  // ) {
  //   const user = await this.socketUserService.getUserFromSocket(socket);
  //   if (!user) throw new WsException('No user');
  //   const tasks = await this.projectService.findAllTasks({filters});
  //   socket.broadcast.emit('projectTasks', { tasks, channel: projectId });
  // }

  @SubscribeMessage('projects:detail')
  async getProjectDetails(
    @ConnectedSocket() socket: Socket,
    @MessageBody('projectId') projectId: string,
  ) {
    const user = await this.socketUserService.getUserFromSocket(socket);
    if (!user) throw new WsException('No user');
    const project = await this.projectService.findOne({
      id: projectId,
    });
    socket.broadcast.emit('projectDetails', {
      project,
      channel: projectId,
    });
  }
}
