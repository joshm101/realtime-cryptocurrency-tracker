let instance = null;

/**
 * Singleton service that is the single entry/exit point for
 * every http network request in the application.
 */
class ApiService {
  constructor() {
    if (!instance) {
      // null instance means that this is the
      // first time the service is being
      // instantiated. Set the instance variable
      instance = this;
    }

    // Always return the instance variable that is
    // set on first instantation to ensure this service
    // is a singleton.
    return instance;
  }

  /**
   * Perform a GET request to the specified URL using the
   * given headers.
   * @param {string} url Network request URL endpoint 
   * @param {*} headers key: value JSON data 
   * @return {Promise<any>} GET request Promise
   */
  get(url, headers = {}) {
    // GET request configuration with the provided 
    // payload JSON data and headers JSON data.
    const fetchConfig = this.constructFetchConfig(
      'GET',
      headers
    );
    return this.makeNetworkRequest(url, fetchConfig);
  }

  /**
   * Constructs a Fetch API request config object
   * @param {string} method Request method verb 
   * @param {any} headers key: value object
   * @param {any} payload key: value object 
   * @return {any} Constructed Fetch API config object 
   */
  constructFetchConfig(method, headers = {}, payload) {
    return {
      method,
      headers: new Headers(headers),
      ...payload && { body: JSON.stringify(payload) }
    };
  }

  /**
   * Executes a fetch() network request and returns the 
   * results.
   * @param {string} url Network request endpoint URL 
   * @param {object} fetchConfig Fetch API network request config object
   * @return {Promise<any>} Response promise
   */
  makeNetworkRequest(url, fetchConfig) {
    return fetch(
      url, 
      fetchConfig
    ).then(response =>
      // successful network request, parse
      // response's JSON payload
      response.json()
    ).catch(error => 
      // Some sort of network request error occurred.
      this.handleError(error)
    )
  }

  /**
   * Network request error handler
   * @param {any} error 
   */
  handleError(error) {
    console.error("ApiService error: ", error);
  }
}

export default ApiService;