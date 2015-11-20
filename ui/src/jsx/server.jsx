import ActionTypes from './action/action-types';

import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';

export default class Server {

    constructor(dispatcher){
        this._client = rest.wrap(mime).wrap(errorCode);
        this._dispatcher = dispatcher;
    }

    GET(path, successFunction, errorFunction){
        let requestProperties = {method: 'GET', path: path};
        this._callServer(requestProperties, successFunction, errorFunction)
    }

    POST(path, body, successFunction, errorFunction){
        let requestProperties = {method: 'POST', entity: body, path: path};
        this._callServer(requestProperties, successFunction, errorFunction)
    }

    _callServer(requestProperties, successFunction, errorFunction){
        this._client(requestProperties).then(
                response => {
                if(typeof successFunction !== 'undefined'){
                    successFunction(response.entity)
                }
            },
                response => {
                if(response.status.code==401){
                    this._dispatcher.dispatch({actionType: ActionTypes.errorUnauthorized})
                }

                if(typeof errorFunction !== 'undefined'){
                    errorFunction(response.status.code, response.entity)
                }
            }
        );
    }
}