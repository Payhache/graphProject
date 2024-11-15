import { createEl } from '../utils/Dom.js'

export function createSample(inputHandler) {
    const wrapper = createEl("div", { className: "nomogram__input" })
    const inputInterval = createEl("input", { className: "nomogram__interval-after-ingestion", type: "number", oninput: inputHandler });
    const inputConcentration = createEl("input", { className: "nomogram__interval-paracetamol-concentration", oninput: inputHandler });

    wrapper.appendChild(inputInterval);
    wrapper.appendChild(inputConcentration);

    return wrapper
}