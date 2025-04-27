//cau hinh sokcet-io phia client va export ra bien socketIoInstance
import { io } from "socket.io-client";
import { api_root } from "./utils/constants";
export const socketIoInstance = io(api_root);
