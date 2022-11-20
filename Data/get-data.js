import { LitElement, html, css } from "lit";

export class GetData extends LitElement {
  static get properties() {
    return {
      url: { type: String },
     
    };
  }
  updated() {
    this.getData();
  }

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getData() {
    fetch(this.url)
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        this._sendData(data);
      })
      .catch((error) => {
        console.warn("something went wrong", error);
      });
  }
}
customElements.define("get-data", GetData);
