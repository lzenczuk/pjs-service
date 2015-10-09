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
        this._callServer('GET', path, successFunction, errorFunction)
    }

    POST(path, successFunction, errorFunction){
        this._callServer('POST', path, successFunction, errorFunction)
    }

    _callServer(method, path, successFunction, errorFunction){
        this._client({method: method, path: path}).then(
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