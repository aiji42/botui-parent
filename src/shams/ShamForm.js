export default class ShamForm {
  constructor(form) {
    this.form = form;
    if (form) this.data = new FormData(form);
  }

  append(appends, safely = false) {
    Object.keys(appends).forEach((key) => {
      if (!safely) this.data.set(key, appends[key]);
      else if (this.data.has(key)) this.data.set(key, appends[key]);
    });
  }

  delete(key) {
    this.data.delete(key);
  }

  get requestBody() {
    const obj = Array.from(this.data)
      .reduce((result, [key, val]) => ({ ...result, [key]: val }), {});
    const params = new URLSearchParams();
    Object.keys(obj).forEach((key) => params.append(key, obj[key]));
    return params;
  }

  get action() { return this.form.attributes.action; }

  get elements() { return this.form.elements; }
}