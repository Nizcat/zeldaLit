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
        background-color: #97e7bd;
        justify-content: center;
      }
      .cardContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 2em;
        margin-top: 2em;
        justify-items: center;

        width: 80vw;
      }
      .card {
        display:flex;
        flex-direction:column;
        background-color: white;
        padding: 1em;
        border-radius: 15px;
        justify-content: calc();
        align-items: center;
      }
      .imageCard {
        box-shadow: 0.2em 0.2em #2926fc;
      }
      .locationList {
        align-self: flex-start;
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
      <div class="cardContainer">
        ${this.wiki.map(
          (element) =>
          
            html`
              <div class="card">
                <h2>${element.name}</h2>
                <img src="${element.img}" class="imageCard" />
                <p>${element.description}</p>
                ${element.location != null
                  ? html` <p>Common locations:</p>
                      ${element.location.map(
                        (element) => html` <li class="locationList">${element}</li> `
                      )}`
                  : html`<p></p>`}
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
