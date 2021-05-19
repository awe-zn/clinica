export default function hasClass(el, className) {
  const classGroup = Array(...el.classList);

  const hasClassName = classGroup.find((currentClassName) => currentClassName === className);

  return hasClassName;
}
