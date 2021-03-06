import DOM from './DOM';
import instantiateComponent from './instantiateComponent';

const DOM_KEY = '_qreact_';
const reactInstances = {};
let incrementId = 0;

function isRendered(node) {
  return node[DOM_KEY];
}

function render(element, node) {
  if (!isRendered(node)) {
    mount(element, node);
  } else {
    update(element, node);
  }
}

function mount(element, node) {
  node[DOM_KEY] = incrementId;

  const component = instantiateComponent(element);
  
  reactInstances[incrementId] = component;
  component.instantiate();

  DOM.empty(node);
  DOM.appendChild(node, component.getInternalDom());

  incrementId++;
}

function update(element, node) {
  const componentId = node[DOM_KEY];

  reactInstances[componentId].reconcile();
}

export default render;