var elSelectPage
var errorContent
var receiptContent
var editorToggleContainer

var bgColorPicker
var boxBGPicker
var textColorPicker
var btnBGPicker
var btnBorderPicker
var btnColorPicker

var topImage
var bottomImage

const SAVED_DATA_KEY = "pilea-saved-config-obj"

window.addEventListener("load", startup, false)

function startup() {
  elSelectPage = document.getElementById("pages-select")
  errorContent = document.getElementById("error-page")
  receiptContent = document.getElementById("receipt-page")
  editorToggleContainer = document.querySelector('div.toggle-editor')

  bgColorPicker = document.getElementById("bgColorPicker")
  boxBGPicker = document.getElementById("boxBGColorPicker")
  textColorPicker = document.getElementById("boxTextColorPicker")
  btnBGPicker = document.getElementById("btnBGPicker")
  btnBorderPicker = document.getElementById("btnBorderPicker")
  btnColorPicker = document.getElementById("btnColorPicker")

  topImage = document.getElementById('top-image')
  bottomImage = document.getElementById('bottom-image')

  // TODO Set default
  // bg
  // box color: rgb(59, 59, 59) !important;
  // Setup listener

  var savedData = window.localStorage.getItem(SAVED_DATA_KEY)
  
  // Restore saved data
  if (savedData) {
    savedData = JSON.parse(savedData)
    bgColorPicker.value = savedData.backgroundColor
    changeBackgroundColor(savedData.backgroundColor, "body")

    boxBGPicker.value = savedData.box.backgroundColor
    changeBackgroundColor(savedData.box.backgroundColor, "div.box")

    textColorPicker.value = savedData.box.color
    changeColor(savedData.box.color, "div.box")
    changeColor(savedData.box.color, "table")

    // Button
    btnBGPicker.value = savedData.button.backgroundColor
    changeBackgroundColor(savedData.button.backgroundColor, "button.btn")
    btnBorderPicker.value = savedData.button.borderColor
    changeBorderColor(savedData.button.borderColor, "button.btn")
    btnColorPicker.value = savedData.button.color
    changeColor(savedData.button.color, "button.btn")

    // Images
    topImage.src = savedData.images.top
    if (!savedData.images.bottom.includes("/media/transparent.svg")) {
      bottomImage.src = savedData.images.bottom
    }
  }

  bgColorPicker.addEventListener("input", (event) => changeBackgroundColor(event.target.value, "body"), false)
  boxBGPicker.addEventListener("input", (event) => changeBackgroundColor(event.target.value, "div.box"), false)
  textColorPicker.addEventListener("input", (event) => {
    changeColor(event.target.value, "div.box")
    changeColor(event.target.value, "table")
  }, false)
  btnBGPicker.addEventListener("input", (event) => changeBackgroundColor(event.target.value, "button.btn"), false)
  btnColorPicker.addEventListener("input", (event) => changeColor(event.target.value, "button.btn"), false)
  btnBorderPicker.addEventListener("input", (event) => changeBorderColor(event.target.value, "button.btn"), false)
}

toggleEditor = (event) => {
  let el = document.getElementById('editor-panel')
  let toggle = document.getElementById('editor-panel-toggle')
  if (el.className === "editor") {
    el.className = "editor editor-collapse"
    toggle.src = "./media/icon/angles-right-solid.svg"
    // Hide drawer content
    document.querySelector("div.controls").style.display = "none"
    editorToggleContainer.style.display = 'flex'
    editorToggleContainer.style.flex = 1
    editorToggleContainer.style.alignItems = 'center'
  } else {
    el.className = "editor"
    toggle.src = "./media/icon/xmark-solid.svg"
    document.querySelector("div.controls").style.display = "flex"
    editorToggleContainer.style.display = 'block'
    editorToggleContainer.style.flex = 0
    editorToggleContainerstyle.alignItems = undefined
  }
}

changeBackgroundColor = (value, target) => {
  let elements = document.querySelectorAll(target)
  elements.forEach(el => {
    el.style.backgroundColor = value
  });
}

changeColor = (value, target) => {
  let elements = document.querySelectorAll(target)
  elements.forEach(el => {
    el.style.color = value
  });
}

changeBorderColor = (value, target) => {
  
  let elements = document.querySelectorAll(target)
  elements.forEach(el => {
    el.style.borderColor = value
  });
}

changePage = () => {
  switch(elSelectPage.value) {
    case 'receipt':
      receiptContent.style.display = 'block'
      errorContent.style.display = 'none'
    break
    case 'error':
      receiptContent.style.display = 'none'
      errorContent.style.display = 'block'
    break
  }
}

getConfigData = () => {
  return {
    backgroundColor: bgColorPicker.value,
    box: {
      backgroundColor: boxBGPicker.value,
      color: textColorPicker.value
    },
    button: {
      backgroundColor: btnBGPicker.value,
      color: btnColorPicker.value,
      borderColor: btnBorderPicker.value
    },
    images: {
      top: topImage.src,
      bottom: bottomImage.src
    }
  }
}

changeImage = (event, target) => {
  if (event.files && event.files[0]) {
    var reader = new FileReader()

    reader.onload = (e) => {
      document.getElementById(target).src = e.target.result
    }

    reader.readAsDataURL(event.files[0])
  }
}

changeBottomImage = (event) => {

}

exportData = () => {
  let s = getConfigData()

  const a = document.createElement("a")
  const file = new Blob([JSON.stringify(s)], {type: 'text/plain'})
  a.href = URL.createObjectURL(file)
  a.download = "theme-config.json"
  a.click()
}

saveDataLocally = () => {
  let data = getConfigData()
  window.localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(data))
}

reset = () => {
  window.localStorage.removeItem(SAVED_DATA_KEY)
  window.location.reload()
}

importConfig = (event) => {
  if (event.files && event.files[0]) {
    var reader = new FileReader()

    reader.onload = (e) => {
      window.localStorage.setItem(SAVED_DATA_KEY, e.target.result)
      window.location.reload()
    }

    reader.readAsText(event.files[0])
  }
}