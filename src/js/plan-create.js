import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function planCreate() {
  const bodyEl = document.querySelector('body');

  bodyEl.dataset.page === 'plan-create' && (window.onload = init);
}

function init() {
  initEditor();
}

function initEditor() {
  ClassicEditor.create(document.querySelector('#editor')).catch((error) => {
    console.error(error);
  });
}

export default planCreate;
