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
import { TasksService } from './tasks.service';

@UseGuards(SocketAuthGuard)
@WebSocketGateway()
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketUserService: SocketUserService,
    private readonly taskService: TasksService,
  ) {}
  private logger: Logger = new Logger(TaskGateway.name);
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

  @SubscribeMessage('taskAssignee:list')
  async taskAssignees(
    @ConnectedSocket() socket: Socket,
    @MessageBody('taskId') taskId: string,
  ) {
    const user = await this.socketUserService.getUserFromSocket(socket);
    if (!user) throw new WsException('No user');

    const assignees = await this.taskService.findAssigneesByTask({ taskId });
    socket.broadcast.emit('taskAssignee', { assignees, channel: taskId });
  }
  @SubscribeMessage('tasks:details')
  async taskDetails(
    @ConnectedSocket() socket: Socket,
    @MessageBody('taskId') taskId: string,
  ) {
    const user = await this.socketUserService.getUserFromSocket(socket);
    if (!user) throw new WsException('No user');
    const taskDetails = await this.taskService.findOne({
      where: { id: taskId },
    });
    socket.broadcast.emit('taskDetails', {
      taskDetails,
      channel: taskId,
    });
  }
}
