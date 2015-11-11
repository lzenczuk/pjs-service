export default class ConnectionModel {

    constructor(src, des, srcX, srcY, desX, desY, index) {

        this.src = src;
        this.des = des;
        this.srcX = srcX;
        this.srcY = srcY;
        this.desX = desX;
        this.desY = desY;
        this.index = index
    }

    get connectionId(){
        return this.src+'_'+this.des+'_'+this.index
    }
}