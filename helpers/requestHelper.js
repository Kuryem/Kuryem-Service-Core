const frError = require('../error/frError');
const ErrorCodes = require('../error/errorCodes');
const axios = require('axios');
const utilities = require('./utilities');

module.exports = class RequestHelper {
  constructor(token, _baseUrl) {
    let service = axios.create({
      headers: {
        Authorization: token,
      },
      options,
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);

    this.service = service;
    this.baseUrl = _baseUrl;
    this.token = token;
  }

  handleSuccess(response) {
    if (process.env.KEEPLOGS == 1) {
      console.info('SUCCESS REQUEST ', response.data);
    }
    return response;
  }

  handleError = (error) => {
    console.error('REQUEST ERROR ', error);

    throw new frError({
      message: error.response ? error.response.data.message : error.message,
      code: ErrorCodes.RequestError,
      status: error.response ? error.response.status : 502,
      context: {
        message: error.response ? error.response.data : error,
      },
    });
  };

  delete(path) {
    if (process.env.KEEPLOGS == 1) {
      console.info('REQUEST => DELETE', this.baseUrl + path);
    }
    return new Promise((resolve, reject) => {
      this.service
        .delete(this.baseUrl + path)
        .then((resp) => {
          console.log(resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  get(path) {
    if (process.env.KEEPLOGS == 1) {
      console.info('REQUEST => GET', this.baseUrl + path);
    }
    return new Promise((resolve, reject) => {
      this.service
        .get(this.baseUrl + path)
        .then((resp) => {
          console.log(resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  post(path, payload, cleanObject = false) {
    if (process.env.KEEPLOGS == 1) {
      console.info('REQUEST => POST', this.baseUrl + path, payload);
    }
    if (cleanObject) payload = utilities.cleanObject(payload);
    return new Promise((resolve, reject) => {
      var options = {
        host: this.baseUrl,
        port: 80,
        path: path,
        data: payload,
        method: 'POST',
      };
      this.service
        .post(options)
        .then((resp) => {
          console.log(resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  update(path, payload, cleanObject = false) {
    if (process.env.KEEPLOGS == 1) {
      console.info('REQUEST => PUT', this.baseUrl + path, payload);
    }
    if (cleanObject) payload = utilities.cleanObject(payload);
    return new Promise((resolve, reject) => {
      this.service
        .put(this.baseUrl + path, payload)
        .then((resp) => {
          console.log(resp.data);
          resolve(resp.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
};
