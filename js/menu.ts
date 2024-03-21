const btnBurger = document.getElementById("btn-burger") as HTMLDivElement | null

if (!btnBurger) {
  throw new Error("One or more elements are missing")
}

btnBurger.addEventListener("click", function () {
  const menu = document.getElementById("myNav") as HTMLElement | null

  if (!menu) {
    throw new Error("One or more elements are missing")
  }
  menu.classList.toggle("hidden")
})

window.onload = function () {
  adaptMenuToScreen()
}

window.onresize = function () {
  adaptMenuToScreen()
}

function adaptMenuToScreen() {
  const menu = getMenuElements()

  menu.btnBurger.classList.toggle("hidden", menu.isBigScreen)
  menu.navButtons.classList.toggle("hidden", !menu.isBigScreen)
}

function isBigScreen() {
  const windowWidth = window.innerWidth
  return windowWidth > 960
}

function getMenuElements() {
  const navButtons = document.getElementById("myNav") as HTMLElement | null
  const btnBurger = document.getElementById("btn-burger") as HTMLElement | null
  if (!navButtons || !btnBurger) {
    throw new Error("One or more elements are missing")
  }

  const menu = {
    isBigScreen: isBigScreen(),
    navButtons,
    btnBurger,
  }
  return menu
}
