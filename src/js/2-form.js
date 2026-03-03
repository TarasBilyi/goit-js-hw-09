const formData = {
  email: '',
  message: '',
};
const STORAGE_KEY = 'feedback-form-state';

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data ?? defaultValue;
  } catch {
    return jsonData ?? defaultValue;
  }
}

const form = document.querySelector('.feedback-form');

form.addEventListener('input', e => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
  saveToLS(STORAGE_KEY, formData);
});

document.addEventListener('DOMContentLoaded', e => {
  const data = loadFromLS(STORAGE_KEY, {});
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (form.elements.email.value === '' || form.elements.message.value === '') {
    return alert('Fill please all fields');
  }

  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
