import {getStorage} from "@/utils/storage";
import {storageName} from "@/config/config";

export function socket(events?: {
  [WsEventType: string]: Function
}) {
  const token = getStorage(storageName).token;
  const url = `ws://localhost:8001?token=${token}`;
  const ws = new WebSocket(url);
  ws.onopen = evt => {
    console.log('websocket connected');
  };
  ws.onmessage = evt => {
    const data = JSON.parse(evt.data);
    console.log('websocket data:', data);
    switch (data.type) {
      case WsEventType.newRoom:
        console.log('有人创建了房间');
        events && events[WsEventType.newRoom] && events[WsEventType.newRoom](data.data);
        break;
    }
  };
  ws.onclose = evt => {
    console.log('websocket closed');
  };
  ws.onerror = evt => {
    console.log('websocket connect error', evt);
  };

  return ws;
}

export enum WsEventType {
  newRoom = 0,

}
export interface WsSendData {
  type: WsEventType,
  data: any
}