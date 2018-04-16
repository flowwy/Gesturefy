'use strict'

const Config = window.top.Config;

/**
 * TODO:
 * - add indention alternative to separate groups
 * - collapse groups
 * - add slider for opacity inputs and remove unnecessary descriptions
 */


// apply values to input fields and add their event function
const inputs = document.querySelectorAll(".color-select-field, .select-field, .input-field, .toggle-button");
      for (let input of inputs) {
        const value = getObjectPropertyByString(Config.Settings, input.dataset.hierarchy)[input.name];
        if (input.type === "checkbox") input.checked = value;
        else input.value = value;
        input.addEventListener('change', onInput);
      }

// toggle collapsables and add their event function
const collapses = document.querySelectorAll("[data-collapse-target]");
      for (let collapse of collapses) {
        collapse.addEventListener('change', onCollapse);
        onCollapse.call(collapse);
      }



/**
 * save input value if valid
 **/
function onInput () {
  if (this.validity.valid) {
    let value;
    // get true or false for checkboxes
    if (this.type === "checkbox") value = this.checked;
    // get value either as string or number
    else value = isNaN(this.valueAsNumber) ? this.value : this.valueAsNumber;
    // set property to given object hierarchy https://stackoverflow.com/a/33397682/3771196
    getObjectPropertyByString(Config.Settings, this.dataset.hierarchy)[this.name] = value;
  }
}


/**
 * hide or show on collapse toggle
 **/
function onCollapse (event) {
  const targetElements = document.querySelectorAll(`data-collapse-id=${this.dataset["collapse-target"]}`);

  for (element of targetElements) {
    if (element.style.height === "0px" && this.checked)
      element.style.height = element.scrollHeight + "px";
    // if user dispatched the function, then hide with animation, else hide without animation
    else if (!this.checked) {
      if (event) {
        element.style.height = element.scrollHeight + "px";
        // trigger reflow
        element.offsetHeight;
      }
      element.style.height = "0px";
    }
  }
}


/**
 * helper function do get property by string concatenated with dots
 **/
function getObjectPropertyByString (object, string) {
  // get property from object hierarchy https://stackoverflow.com/a/33397682/3771196
  return string.split('.').reduce((o,i) => o[i], object);
}
