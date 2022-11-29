import { LitElement, html, css } from "lit";
import "../Data/get-data";
export default class MainMenu extends LitElement {
  static get properties() {
    return {
      wiki: { type: Object },
      item: { type: String },
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
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 2em;
        margin-top: 2em;
        justify-items: center;

        width: 90vw;
      }
      .card {
        display: flex;
        flex-direction: column;
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
      this.requestUpdate();
    });
  
  }

  render() {
    return html`
      <div>
        <h1>Zelda's monsters</h1>
        <select name="items" id="items" @change="${this.getItem}" >
          <option value="monsters">Monsters</option>
          <option value="equipment">Equipment</option>
          <option value="materials">Material</option>
          <option value="creatures.non_food">Creatures</option>
          <option value="creatures.food">Food Creatures</option>
        </select>
        

        <get-data
          url="https://botw-compendium.herokuapp.com/api/v2/all"
        ></get-data>
        ${(this.dataTemplate())}
      </div> 
    `;
  }
  firstUpdated() {
    super.firstUpdated();
    this.item =this.shadowRoot.getElementById("items").value;
    console.log(this.item);

  }

  dataTemplate() {
    
    return html`
      <div class="cardContainer">
        ${this.wiki.map(
          (element) =>
            html`
              ${element.name != "name"
                ? html` <div class="card">
                    <h2>${element.name}</h2>
                    <img src="${element.img}" class="imageCard" />
                    <p>${element.description}</p>
                    ${element.location != null
                      ? html` <p>Common locations:</p>
                          ${element.location.map(
                            (element) =>
                              html` <li class="locationList">${element}</li> `
                          )}`
                      : html`<p></p>`}
                  </div>`
                : html``}
            `
        )}
      </div>
    `;
  }

  _dataFormat(data) {
   
    data[this.item].forEach((element) => {
      this.wiki.push({
        name: element.name,
        img: element.image,
        description: element.description,
        location: element.common_locations,
      });
    });
    this.requestUpdate();
    
  }
  

  getItem(){
    console.log("change",this.shadowRoot.getElementById("items").value);
    this.item =this.shadowRoot.getElementById("items").value;
    this.requestUpdate();
  }

 

  
}
customElements.define("main-menu", MainMenu);
