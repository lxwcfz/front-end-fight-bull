import {getStorage} from "@/utils/storage";
import {storageName} from "@/config/config";

export function socket(events?: {
  [WsEventType: string]: Function
}) {
  const token = getStorage(storageName).token;
  const url = `ws://localhost:8001?token=${token}`;
  // const url = `ws://139.9.113.43:8001?token=${token}`;
  const ws = new WebSocket(url);
  ws.onopen = evt => {
    console.log('websocket connected');
  };
  ws.onmessage = evt => {
    const data = JSON.parse(evt.data);
    // console.log('websocket data:', data);
    switch (data.type) {
      case 'heartBeat':
        console.log('heart beat');
        break;
      case WsEventType.newRoom:
        // console.log('有人创建了房间', data.data.data);
        events && events[WsEventType.newRoom] && events[WsEventType.newRoom](data.data.data);
        break;
      case WsEventType.intoRoom:
        // console.log('有人进入了房间', data.data.data);
        events && events[WsEventType.intoRoom] && events[WsEventType.intoRoom](data.data.data);
        break;
      case WsEventType.deleteRoom:
        // console.log('有人删除了房间', data.data.data);
        events && events[WsEventType.deleteRoom] && events[WsEventType.deleteRoom](data.data.data);
        break;
      case WsEventType.outRoom:
        // console.log('有人离开了房间', data);
        events && events[WsEventType.outRoom] && events[WsEventType.outRoom](data.data.data);
        break;
      case WsEventType.ready:
        events && events[WsEventType.ready] && events[WsEventType.ready](data.data.data);
        break;
      case WsEventType.handOutCard:
        events && events[WsEventType.handOutCard] && events[WsEventType.handOutCard](data.data.data);
        break;
      case WsEventType.getHost:
        events && events[WsEventType.getHost] && events[WsEventType.getHost](data.data.data);
        break;
      case WsEventType.finish:
        events && events[WsEventType.finish] && events[WsEventType.finish](data.data.data);
        break;
      case WsEventType.again:
        events && events[WsEventType.again] && events[WsEventType.again](data.data.data);
        break;
    }
  };
  ws.onclose = evt => {
    console.log('websocket closed');
  };
  ws.onerror = evt => {
    console.log('websocket connect error', evt);
    setTimeout(() => {
      socket(events);
    }, 2000);
  };

  return ws;
}

export enum WsEventType {
  newRoom = 0,
  ready = 1,
  handOutCard = 2,
  intoRoom = 3,
  outRoom = 4,
  deleteRoom = 5,
  getHost = 6,  //抢庄
  finish = 7,
  again = 8
}
export interface WsSendData {
  type: WsEventType,
  data: any
}