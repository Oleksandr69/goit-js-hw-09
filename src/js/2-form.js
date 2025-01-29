const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = { email: '', message: '' };

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();
  formData = { email, message };
  saveToLS(STORAGE_KEY, formData);
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  if (email && message) {
    formData = { email, message };
    console.log(formData);
    e.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
  } else {
    alert('Fill please all fields');
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function loadFromLS(key) {
  const item = localStorage.getItem(key);
  try {
    const data = JSON.parse(item);
    return data;
  } catch {
    return item;
  }
}
function initForm() {
  const data = loadFromLS(STORAGE_KEY);
  // console.log(formData);
  refs.form.elements.email.value = data?.email || '';
  refs.form.elements.message.value = data?.message || '';
}
initForm();
