import { createEl } from "./Dom"

export function createSample(inputHandler: () => void) {
  const wrapper = createEl<"div">("div", { className: "nomogram__input" })
  const inputInterval = createEl<"input">("input", {
    className: "nomogram__interval-after-ingestion",
    type: "number",
    oninput: inputHandler,
  })
  const inputConcentration = createEl<"input">("input", {
    className: "nomogram__interval-paracetamol-concentration",
    oninput: inputHandler,
  })

  wrapper.appendChild(inputInterval)
  wrapper.appendChild(inputConcentration)

  return wrapper
}
