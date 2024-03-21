export function createEl<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  attrs: Partial<HTMLElementTagNameMap[T]>
) {
  const htmlElement = document.createElement<T>(tag)

  Object.entries(attrs).forEach(
    ([name, value]) =>
      (htmlElement[name as keyof HTMLElementTagNameMap[T]] = value)
  )

  return htmlElement
}

export function hideHtmlElement(htmlElement: HTMLElement) {
  htmlElement.classList.add("hidden")
}

export function showHtmlElement(htmlElement: HTMLElement) {
  htmlElement.classList.remove("hidden")
}

export function toggleClassNames(
  htmlElement: HTMLElement,
  classes: Record<string, boolean>
) {
  Object.entries(classes).forEach(([className, toggleValue]) => {
    htmlElement.classList.toggle(className, toggleValue)
  })
}

export function getSuccessOrErrorClass(isToxic: boolean) {
  return {
    success: !isToxic,
    error: isToxic,
  }
}
