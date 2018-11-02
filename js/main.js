const validateRegex = (value, regex) => regex.test(value);

const validateField = (name, value) => {
  switch (name) {
    case 'firstname':
    case 'lastname':
    case 'address':
    case 'password':
      if (value.length > 0) return true;

    case 'email':
      return validateRegex(value, /[^@]+@[^\.]+\..+/);

    case 'phone':
      return validateRegex(value, /^\+[0-9]{6,13}$/);

    case 'post':
      return validateRegex(value, /^[0-9]{5}$/);
  };

  return false;
}

const validateForm = (event) => {
  const errors = [];
  const elements = document.querySelectorAll('input');
  for (const element of elements) {
    const name = element.getAttribute('name');
    const value = element.value;

    element.style.borderColor = null;

    if (!validateField(name, value)) {
      element.style.borderColor = 'red';
      errors.push(name);
    }
  }

  const container = document.querySelector('.errors');
  if (errors.length) {
    event.preventDefault();
    container.style.display = 'block';
    container.innerHTML = `Please check the following fields:<br />${errors.join('<br />')}`;
  }
};

const button = document.getElementById('javascript-submit');
if (button) button.addEventListener('click', validateForm);