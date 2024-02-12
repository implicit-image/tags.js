
// roughly based on https://github.com/tsoding/grecha.js
//==============================================================
// BASICALLY REACT :)
// =============================================================
function tag(name, attrs={}) {
  let elem = document.createElement(name)
  for (attr in attrs) {
    attrValue = attrs[attr].toLowerCase()
    elem.setAttribute(attr.toString(), attrs[attr])
  }
  elem.$$ = (...children) => {
    for (child of children) {
      elem.appendChild(child)
    }
    return elem
  }
  elem.$attrs = (attrs) => {
    elem.attributes = attrs
  }
  elem.$id    = (id) => {
    elem.setAttribute("id", id)
    return elem
  }
  elem.$class = (classString) => {
    elem.setAttribute("class", classString)
    return elem
  }
  elem.$style = (styleString) => {
    elem.setAttribute("style", styleString)
    return elem
  }
  elem.$src = (srcString) => {
    elem.setAttribute("src", srcString)
    return elem
  }
  elem.$inTxt = (text) => {
    elem.innerText = text
    return elem
  }
  elem.$href = (srcString) => {
    elem.setAttribute("href", srcString)
    return elem
  }
  elem.$child = (elem) => {
    elem.appendChild(elem)
    return elem
  }
  // generic attribute setter
  elem.$sa = (prop, value) => {
    elem.setAttribute(prop, value)
    return elem
  }
  elem.$ael = (event, callback) => {
    elem.addEventListener(event, callback)
    return elem
  }
  return elem
}
const MUNDANE_TAGS = ["canvas", "h1", "h2", "h3", "p", "a", "div", "span", "select", "button"];
for (let tagName of MUNDANE_TAGS) {
    window[tagName] = (attrs) => tag(tagName, attrs);
}


// common tags
const main = (attrs={}) => tag("main", attrs)
const input = (attrs={}) => tag("input", attrs)
const ul = (attrs={}) => tag("ul", attrs)
const li = (attrs={}) => tag("li", attrs)
const img = (attrs={}) => tag("img", attrs)
const br = () => tag("br")

//=======================================================================
// STYLES
//========================================================================

function loadStyles(styles) {
  for (selector in styles) {
    let elems = 0;
    switch (selector[0]) {
      case ".":
        elems = document.getElementsByClassName(selector.substr(1))
        break;
      case "#":
        let elem = document.getElementById(selector.substr(1))
        elems = [elem]
        break;
      default:
        elems = document.getElementsByTagName(selector)
    }
    for (elem of elems) {
      for (prop in styles[selector]) {
        elem.style[prop] = styles[selector][prop]
      }
    }
  }
}


function initPage(styles, mainElem) {
  document.querySelector("body").appendChild(mainElem)
  loadStyles(styles)
}
