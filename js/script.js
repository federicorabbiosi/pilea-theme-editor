var elSelectPage
var errorContent
var receiptContent
var editorToggleContainer

var bgColorPicker
var boxBGPicker
var textColorPicker
var accentTextColorPicker
var totalRowColorPicker
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
  accentTextColorPicker = document.getElementById("boxAccentColorPicker")
  totalRowColorPicker = document.getElementById("boxTotalRowColorPicker")
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
    bgColorPicker.value = savedData.bc_body
    changeBackgroundColor(savedData.bc_body, "body")

    boxBGPicker.value = savedData.card_input_data.background
    changeBackgroundColor(savedData.card_input_data.background, "div.box")

    textColorPicker.value = savedData.card_input_data.text_color
    changeColor(savedData.card_input_data.text_color, "div.box")
    changeColor(savedData.card_input_data.text_color, "table")

    accentTextColorPicker.value = savedData.card_input_data.text_accent_color
    changeColor(savedData.card_input_data.text_accent_color, "p.accent-color")

    totalRowColorPicker.value = savedData.card_input_data.total_amount_text_color
    changeColor(savedData.card_input_data.total_amount_text_color, "div.total-row")

    // Button
    btnBGPicker.value = savedData.button.primary.background
    changeBackgroundColor(savedData.button.primary.background, "button.btn")
    btnBorderPicker.value = savedData.button.primary.border
    changeBorderColor(savedData.button.primary.border, "button.btn")
    btnColorPicker.value = savedData.button.primary.text_color
    changeColor(savedData.button.primary.text_color, "button.btn")

    // Images
    topImage.src = savedData.top_image_ext
    if (!savedData.bottom_image_ext.includes("/media/transparent.svg")) {
      bottomImage.src = savedData.bottom_image_ext
    }
  } else {
    // initialize picker with pilea theme
    bgColorPicker.value = '#01043a'
    boxBGPicker.value = '#ffffff'
    textColorPicker.value = '#3b3b3b'
    accentTextColorPicker.value = '#3b3b3b'
    totalRowColorPicker.value = '#3b3b3b'
    btnBGPicker.value = '#6c757d'
    btnBorderPicker.value = '#6c757d'
    btnColorPicker.value = '#ffffff'
  }

  bgColorPicker.addEventListener("input", (event) => changeBackgroundColor(event.target.value, "body"), false)
  boxBGPicker.addEventListener("input", (event) => changeBackgroundColor(event.target.value, "div.box"), false)
  textColorPicker.addEventListener("input", (event) => {
    changeColor(event.target.value, "div.box")
    changeColor(event.target.value, "table")
  }, false)
  accentTextColorPicker.addEventListener("input", (event) => changeColor(event.target.value, "p.accent-color"))
  totalRowColorPicker.addEventListener("input", (event) => changeColor(event.target.value, "div.total-row"))
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
    editorToggleContainer.style.alignItems = undefined
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
    bc_body: bgColorPicker.value,
    card_input_data: {
      background: boxBGPicker.value,
      text_color: textColorPicker.value,
      text_accent_color: accentTextColorPicker.value,
      total_amount_text_color: totalRowColorPicker.value
      /* TODO
        importo_aggiornato
        border
        title_color
      */
    },
    button: {
      primary: {
        background: btnBGPicker.value,
        text_color: btnColorPicker.value,
        border: btnBorderPicker.value
      }
    },
    logo_nexi_receipt_it: document.getElementById('nexi-logo').src.split('media/')[1],
    bottom_image_ext: bottomImage.src,
    top_image_ext: topImage.src
  }
}

changeNexiLogo = (event) => {
  document.getElementById('nexi-logo').src = event.target.value === 'normal' ? "./media/nexi-logo-dark.webp" : "./media/nexi-logo.webp"
  console.log(document.getElementById('nexi-logo').src.split('media/')[1])
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
  initializePicker()
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

initializePicker = () => {

}

// initialize picker and localstorage with savedTheme or pilea theme
setDefaultValue = () => {

}