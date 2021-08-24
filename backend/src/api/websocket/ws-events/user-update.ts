import { Socket } from 'socket.io';
import Users from '../../../data/users';
import { WS } from '../../../types/ws';
import Deps from '../../../utils/deps';
import { WSGuard } from '../../modules/ws-guard';
import { WebSocket } from '../websocket';
import { WSEvent, } from './ws-event';

export default class implements WSEvent<'USER_UPDATE'> {
  on = 'USER_UPDATE' as const;

  constructor(
    private users = Deps.get<Users>(Users),
    private guard = Deps.get<WSGuard>(WSGuard),
  ) {}

  public async invoke(ws: WebSocket, client: Socket, { token, username, avatarURL }: WS.Params.UserUpdate) {
    const { id: userId } = await this.guard.decodeKey(token);
    const user = await this.users.get(userId);

    const partialUser = { avatarURL, username };
    this.guard.validateKeys('user', partialUser);

    await user.updateOne(
      partialUser,
      { runValidators: true, context: 'query' },
    );

    client.emit('USER_UPDATE', { userId, partialUser } as WS.Args.UserUpdate);
  }
}