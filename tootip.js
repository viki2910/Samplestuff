const template = document.createElement(`template`);

template.innerHTML = `
    <style>
      .tooltip-container {
        position: absolute;
        display: inline;
        width: auto;
      }

      .tooltip-btn {
        outline: none;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        padding: 6px 12px;
        background-color: rgb(43, 50, 151);
        color: #fff;
        font-size: 15px;
        transition: 0.2s all ease;
      }

      .tooltip-btn:hover{
        background-color: rgb(61, 70, 199);
      }

      .tooltip-msg{
        font-size:15px;
        color:white;
        line-height:1.4;
        background: #34b349;
        padding: 10px;
        border-radius: 5px;
        z-index: 9;
        position: absolute;
        bottom: 125%;
        left:80%;
        transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);
        transform: scale(0);
        transform-origin: bottom left;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
        width: 200px;
      }
      
    </style>
    <div class="tooltip-container">
      <input type="button" value="Show" class="tooltip-btn"></input>
      <div class="tooltip-msg">
        <slot>msg</slot>
      </div>
    </div>
`;

class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector(".tooltip-btn");
    const tootipElement = this.shadowRoot.querySelector(".tooltip-msg");
    this.getRootNode().addEventListener("click", () => {
      tootipElement.style.transform = "scale(0)";
    });
    btn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      tootipElement.style.transform = "scale(1)";
    });
  }
}

window.customElements.define("vpn-tooltip", Tooltip);
