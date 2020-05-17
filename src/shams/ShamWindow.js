import ShamForm from './ShamForm';
import { urlEncode, convert } from 'encoding-japanese';

const parseBlob = blob => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => { resolve(reader.result); };
    reader.readAsText(blob, 'shift-jis');
  });
};

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
    this.url = res.url;
    this.form = new ShamForm(selector ? this.document.querySelector(selector) : document.createElement('form'));
  }

  static async post({ url, body }) {
    const bodyStrings = [];
    for (const [key, value] of body) {
      bodyStrings.push(`${key}=${urlEncode(convert(value, 'SJIS'))}`);
    }
    const res = await fetch(url,
      {
        credentials: 'include',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: bodyStrings.join('&'),
        method: 'POST',
        mode: 'cors',
      });
    return ShamWindow.handleErrors(res);
  }

  static async getDocumentFromResponse(res) {
    const text = await parseBlob(await res.blob());
    return new DOMParser().parseFromString(text, 'text/html');
  }

  static handleErrors(res) {
    if (res.ok) return res;

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