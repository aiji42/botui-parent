import ShamForm from './ShamForm';

export default class ShamWindow {
  constructor({ document, url, form }) {
    this.document = document;
    this.url = url;
    this.form = new ShamForm(form);
  }

  async forward({ selector }) {
    const { url, form } = this;
    const requestUrl = new URL(form.action.value, url);
    const res = await ShamWindow.post({ url: requestUrl.href, body: form.requestBody });
    this.document = await ShamWindow.getDocumentFromResponse(res);
    this.url = res.url;
    this.form = new ShamForm(this.document.querySelector(selector));
  }

  static async post({ url, body }) {
    const res = await fetch(url,
      {
        credentials: 'include',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body,
        method: 'POST',
        mode: 'cors',
      });
    return ShamWindow.handleErrors(res);
  }

  static async getDocumentFromResponse(res) {
    const text = await res.text();
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