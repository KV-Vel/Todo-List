export default function createEl(tag, properties) {
  const el = document.createElement(tag);
  for (const key in properties) {
    el[key] = properties[key];
  }
  return el;
}
