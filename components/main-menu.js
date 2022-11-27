import { LitElement, html, css } from "lit";
import "../Data/get-data";
export default class MainMenu extends LitElement {
  static get properties() {
    return {
      wiki: { type: Object },
    };
  }

  static styles = [
    css`
      :host {
        display: flex;
      }
    `,
  ];

  constructor() {
    super();

    this.wiki = [
      {
        name: "name",
        location: [],
      },
    ];
    this.dataTemplate();

    this.addEventListener("ApiData", (e) => {
      this._dataFormat(e.detail.data.data);
      console.log(e.detail.data.data, "me oyes?");
    });
  }

  render() {
    return html`
      <div>
        <h1>Hi!!!</h1>
        <get-data
          url="https://botw-compendium.herokuapp.com/api/v2/all"
        ></get-data>
        ${this.dataTemplate()}
      </div>
    `;
  }

  dataTemplate() {
    console.log(this.wiki, "pinta?");
    return html`
      <div>
        ${this.wiki.map(
          (element) =>
            html`
              <div class="card">
                <div class="card-content">
                  <h2>${element.name}</h2>
                  <img src="${element.img}" />
                  <p>${element.description}</p>
                  ${element.location != null ? 
                  html`
                  <p>Common locations:</p>
                    ${element.location.map(element => html` <li>${element}</li> `)}`
                   :html`<p></p>`
                  }
                </div>
              </div>
            `
        )}
      </div>
    `;
  }

  _dataFormat(data) {
    data["monsters"].forEach((element) => {
      this.wiki.push({
        name: element.name,
        img: element.image,
        description: element.description,
        location: element.common_locations,
      });
    });
    this.requestUpdate();
  }
}
customElements.define("main-menu", MainMenu);
