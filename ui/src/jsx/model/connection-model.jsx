export default class ConnectionModel {

    constructor(connectionId, src, des, srcX, srcY, desX, desY, index) {
        this.connectionId = connectionId;
        this.src = src;
        this.des = des;
        this.srcX = srcX;
        this.srcY = srcY;
        this.desX = desX;
        this.desY = desY;
        this.index = index
    }
}