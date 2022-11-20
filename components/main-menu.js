import { LitElement, html, css } from "lit";
import "../Data/get-data";
export default class MainMenu extends LitElement {

    static get properties() {
        return {
          wiki: { type: Array },
         
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

    this.wiki = [];

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
        ${this.dataTemplate}
      </div>
    `;
  }

  get dataTemplate(){
    console.log(this.wiki, "pinta?");
    return html `
    ${this.wiki.map(element => html`
    <div class= "card" >
        <div class= "card-content">
            <h2>${element.name}</h2>
            <img src="${element.img}">
        </div>

    </div>
    `)}
    `
  }

  _dataFormat(data) {
    let monsters = [];
    
    data["monsters"].forEach((element) => {
      monsters.push({
        name: element.name,
        img: element.img,
      });
    });
    console.log(monsters, "monstruosss");
  }
}
customElements.define("main-menu", MainMenu);
