import { io, Socket } from "socket.io-client";

import { localStorageService } from "~/web/common/services/LocalStorageService";
import store from "~/web/store";
import { updateToken } from "~/web/store/slices/auth.slice";
import { auth } from "../firebase/app";
import { ISSERVER } from "../utils/is-server";

type SocketClient = Socket<any, any>;

class SocketClientManager {
  private socket: SocketClient | null = null;
  constructor() {
    if (!ISSERVER) {
      this.socket = this.createSocketClient();
    }
  }

  private createSocketClient = () => {
    const token = localStorageService.getToken();

    return io("", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      path: "/api/socket.io",
    });
  };

  get client() {
    if (this.socket) {
      if (!this.socket.connected) return this.socket.connect();
      return this.socket;
    }
    this.socket = this.createSocketClient();
    return this.socket;
  }

  deleteSocketInstance() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketManager = new SocketClientManager();

socketManager.client.on("error:unauthorized", async () => {
  const currentUser = auth.currentUser;

  const token = await currentUser?.getIdToken(true);
  if (token) {
    store.dispatch(updateToken(token));
    socketManager.deleteSocketInstance();
  } else {
    store.dispatch(updateToken(null));
    socketManager.deleteSocketInstance();
  }
});
