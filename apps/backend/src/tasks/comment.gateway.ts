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
export class CommentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketUserService: SocketUserService,
    private readonly taskService: TasksService,
  ) {}
  private logger: Logger = new Logger(CommentGateway.name);
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

  @SubscribeMessage('comments:list')
  async getAllComments(
    @ConnectedSocket() socket: Socket,
    @MessageBody('taskId') taskId: string,
  ) {
    const user = await this.socketUserService.getUserFromSocket(socket);
    if (!user) throw new WsException('No user');
    const comments = await this.taskService.findAllCommentsOfTask(taskId);
    socket.broadcast.emit('comments', { comments, channel: taskId });
  }
}
