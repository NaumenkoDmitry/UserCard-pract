/**
 * Обработчик для удаления сломынных картинок
 */
 function deleteHandler({ target }) {
  target.remove();
}

/**
 * Обрабочик для прикрепления картинки к оббертке
 * @param {Event} e 
 */
function imageLoadHandler (e) {
  const {target , target : { dataset: {id}}} = e;
  document.getElementById(`wrapper${id}`).append(target);
}