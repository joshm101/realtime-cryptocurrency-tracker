import io from 'socket.io-client';
import { v4 } from 'uuid';

import CryptoCompareSocketConnectionStringFactory 
from 'cc-socket-connection-string-factory';
import ConfigService from 'config-service';

let instance = null;

/**
 * Singleton service which is used to establish
 * WebSocket connections to the CryptoCompare 
 * WebSocket API.
 */
class CryptoCompareSocketConnectionService {
  constructor() {
    if (!instance) {
      // first instantiation, set singleton
      // instance variable
      instance = this;
      
      // Lookup object of the following format:
      // {
      //   [id: string]: Socket.IOConnection
      // }
      // Generated ID key to WebSocket connection
      // value
      this.socketConnections = {};

      this.socketStringFactory = new CryptoCompareSocketConnectionStringFactory();
      const configService = new ConfigService();
      this.socketUrl = configService.cryptoCompareSocketUrl;
    }

    // Return single instance of this service
    return instance;
  }

  /**
   * Estbalishes a new WebSocket connection
   * with the CryptoCompare API
   * @param {object[]} connectionPairs Array of connection
   * pair data
   * @return {object} Socket.IO connection object
   */
  openConnection(connectionPairs) {
    // generate connection strings that tell
    // the CryptoCompare API which coin market
    // pairs we want data for. Elements from
    // this.generateConnectionString can be
    // undefined, so we use filter to ensure
    // we're only working with defined 
    // connection strings.
    const connectionStrings = connectionPairs.map(
      this.generateConnectionString.bind(this)
    ).filter(string => !!string);

    // generate a unique ID for the connection
    const connectionId = v4();
    
    // Connect to the CryptoCompare WebSocket API
    // and subscribe to updates for the given
    // connection strings
    const socket = io.connect(this.socketUrl)
    socket.emit('SubAdd', { subs: connectionStrings });

    // Update the socketConnections lookup object
    this.socketConnections = Object.assign(
      {},
      this.socketConnections,
      {
        [connectionId]: socket
      }
    );

    return { socket, connectionId };
  }

  /**
   * Closes the WebSocket connection associated
   * with the given ID
   * @param {string} connectionId ID of connection to close
   * @return {boolean} True if connection closed successfully.
   * False otherwise.
   */
  closeConnection(connectionId) {
    if (!connectionId) {
      // connectionId undefined, return false
      // for unsuccessful close
      return false;
    }
    
    // get connection to close and ensure it is defined
    const connectionToClose = this.socketConnections[connectionId];
    if (!connectionToClose) {
      // connectionToClose is not defined, return false
      // for unsuccessful close
      return false;
    }

    // close connection and return true for success
    connectionToClose.close();
    delete this.socketConnections[connectionId];
    return true;
  }

  /**
   * Closes all WebSocket connections with the
   * CryptoCompare API.
   */
  closeAllConnections() {
    // close each socket connection
    Object.values(this.socketConnections).forEach(connection =>
      connection.close()
    );

    // reset the socketConnections object
    Object.assign(
      this.socketConnections,
      {}
    );
  }

  /**
   * Transforms market pair data from the given object into
   * a CryptoCompare WebSocket connection string.
   * @param {object} connectionPairObject Market pair data
   * @return {string} CryptoCompare WebSocket connection string
   */
  generateConnectionString(connectionPairObject) {
    if (!connectionPairObject) {
      return undefined;
    }

    // Destructure object parameter to obtain 
    // pair information
    const {
      connectionTypeId,
      fromSymbol,
      toSymbol,
    } = connectionPairObject;

    return this.socketStringFactory.generateSocketConnectionString(
      connectionTypeId, fromSymbol, toSymbol
    );
  }
}

export default CryptoCompareSocketConnectionService;