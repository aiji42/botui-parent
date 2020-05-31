import ShamForm from './ShamForm';
import { urlEncode, convert } from 'encoding-japanese';
import axios from 'axios';
import * as rax from 'retry-axios';
const axiosInstance = axios.create({ timeout: 10000 });
axiosInstance.defaults.raxConfig = {
  instance: axiosInstance,
  retry: 3,
  noResponseRetries: 3,
  retryDelay: 1000
};
rax.attach(axiosInstance);

export default class ShamWindow {
  constructor({ document, url, form }) {
    this.document = document;
    this.url = url;
    this.form = new ShamForm(form);
  }

  async forward({ selector = null } = {}) {
    const { url, form } = this;
    const requestUrl = new URL(form.action.value, url);
    const res = await ShamWindow.post({ url: requestUrl.href, body: form.requestBody });
    this.document = await ShamWindow.getDocumentFromResponse(res);
    this.url = res.request.responseURL;
    this.form = new ShamForm(selector ? this.document.querySelector(selector) : window.document.createElement('form'));
  }

  static async post({ url, body }) {
    const bodyStrings = [];
    for (const [key, value] of body) {
      bodyStrings.push(`${key}=${urlEncode(convert(value, 'SJIS'))}`);
    }
    const data = bodyStrings.join('&');
    const res = await axiosInstance.post(url, data, {
      withCredentials: true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });

    return ShamWindow.handleErrors(res);
  }

  static async getDocumentFromResponse(res) {
    return new DOMParser().parseFromString(res.data, 'text/html');
  }

  static handleErrors(res) {
    if (res.status === 200) return res;

    switch (res.status) {
      case 400: throw Error('INVALID_TOKEN');
      case 401: throw Error('UNAUTHORIZED');
      case 500: throw Error('INTERNAL_SERVER_ERROR');
      case 502: throw Error('BAD_GATEWAY');
      case 404: throw Error('NOT_FOUND');
      default: throw Error('UNHANDLED_ERROR');
    }
  }
}