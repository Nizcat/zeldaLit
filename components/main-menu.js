import { LitElement, html, css } from "lit";
import "../Data/get-data";
export default class MainMenu extends LitElement {
    
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();

    this.addEventListener("ApiData", (e) => {
      
      this._dataFormat(e.detail.data.data);
    });
  }

  render() {
    return html`
      <div>
        <h1>Hi!!!</h1>
        <get-data
          url="https://botw-compendium.herokuapp.com/api/v2/all"
          method="GET"
        ></get-data>
      </div>
    `;
  }

  _dataFormat(data) {
    let monsters = [];
    
    data["monsters"].forEach((element) => {
      monsters.push({
        name: element.name,
        img: element.image,
      });
    });
    console.log(monsters, "monstruosss");
  }
}
customElements.define("main-menu", MainMenu);
