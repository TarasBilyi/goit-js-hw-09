const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

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

form.addEventListener('input', e => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();
  saveToLS(STORAGE_KEY, formData);
});

document.addEventListener('DOMContentLoaded', e => {
  const data = loadFromLS(STORAGE_KEY, {});
  formData.email = data.email || '';
  formData.message = data.message || '';

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  formData.email = email;
  formData.message = message;
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  formData.email = '';
  formData.message = '';
});
