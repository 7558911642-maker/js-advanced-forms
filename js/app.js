const form = document.getElementById('registrationForm');
const formStatus = document.getElementById('formStatus');
const fullName = document.getElementById('fullName');
const username = document.getElementById('username');
const email = document.getElementById('email');
const birthDate = document.getElementById('birthDate');
const country = document.getElementById('country');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');

const fields = [
  fullName,
  username,
  email,
  birthDate,
  country,
  password,
  confirmPassword,
  terms
];

const textValidationFields = [
  fullName,
  username,
  email,
  birthDate,
  password,
  confirmPassword
];

const errorMessages = {
  fullName: {
    valueMissing: 'El nombre completo es obligatorio.',
    tooShort: 'El nombre completo debe tener al menos 3 caracteres.'
  },
  username: {
    valueMissing: 'El nombre de usuario es obligatorio.',
    patternMismatch: 'El nombre de usuario debe tener entre 4 y 15 caracteres, solo letras, números o guion bajo.',
    tooShort: 'El nombre de usuario debe tener entre 4 y 15 caracteres, solo letras, números o guion bajo.'
  },
  email: {
    valueMissing: 'El correo electrónico es obligatorio.',
    typeMismatch: 'Ingrese un correo electrónico válido.'
  },
  birthDate: {
    valueMissing: 'La fecha de nacimiento es obligatoria.'
  },
  country: {
    valueMissing: 'Debe seleccionar un país.'
  },
  password: {
    valueMissing: 'La contraseña es obligatoria.',
    patternMismatch: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.',
    tooShort: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.'
  },
  confirmPassword: {
    valueMissing: 'Debe confirmar la contraseña.',
    customError: 'Las contraseñas no coinciden.',
    tooShort: 'La confirmación debe tener mínimo 8 caracteres.'
  },
  terms: {
    valueMissing: 'Debe aceptar los términos y condiciones.'
  }
};

function getVisualTarget(field) {
  if (field.type === 'checkbox') {
    return field.closest('.checkbox-row');
  }

  return field;
}

function getErrorElement(field) {
  return document.getElementById(`${field.id}Error`);
}

function getFieldErrorMessage(field) {
  const messages = errorMessages[field.id];

  if (field.validity.valueMissing) {
    return messages.valueMissing;
  }

  if (field.validity.typeMismatch) {
    return messages.typeMismatch;
  }

  if (field.validity.patternMismatch) {
    return messages.patternMismatch;
  }

  if (field.validity.tooShort) {
    return messages.tooShort;
  }

  if (field.validity.customError) {
    return messages.customError;
  }

  return '';
}

function updateFieldState(field) {
  const visualTarget = getVisualTarget(field);
  const isValid = field.checkValidity();

  visualTarget.classList.toggle('input-success', isValid);
  visualTarget.classList.toggle('input-error', !isValid);
}

function showFieldError(field) {
  const errorElement = getErrorElement(field);

  if (!errorElement) {
    return;
  }

  errorElement.textContent = field.checkValidity() ? '' : getFieldErrorMessage(field);
}





function clearFieldError(field) {
  const errorElement = getErrorElement(field);

  if (errorElement) {
    errorElement.textContent = '';
  }
}

function clearFormFeedback() {
  fields.forEach((field) => {
    const visualTarget = getVisualTarget(field);
    visualTarget.classList.remove('input-error', 'input-success');
    clearFieldError(field);
  });

  formStatus.textContent = '';
  formStatus.classList.remove('status-error');
}

function validatePasswords() {
  if (confirmPassword.value !== password.value) {
    confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
  } else {
    // setCustomValidity('') limpia el error personalizado y permite continuar la validación nativa.
    confirmPassword.setCustomValidity('');
  }
}

function validateFieldWithFeedback(field, showErrorMessage = false) {
  if (field === password || field === confirmPassword) {
    validatePasswords();
  }

  updateFieldState(field);

  if (showErrorMessage) {
    showFieldError(field);
  } else if (field.checkValidity()) {
    clearFieldError(field);
  }
}

function handleInput(event) {
  validateFieldWithFeedback(event.target);

  if (event.target === password) {
    validateFieldWithFeedback(confirmPassword);
  }

  formStatus.textContent = '';
  formStatus.classList.remove('status-error');
}

function handleFocusOut(event) {
  validateFieldWithFeedback(event.target, true);

  if (event.target === password) {
    validateFieldWithFeedback(confirmPassword, confirmPassword.value.length > 0);
  }
}

function buildFormData() {
  return {
    nombreCompleto: fullName.value.trim(),
    nombreUsuario: username.value.trim(),
    email: email.value.trim(),
    fechaNacimiento: birthDate.value,
    pais: country.value,
    password: '********',
    confirmacionPassword: 'registrada',
    aceptaTerminos: terms.checked
  };
}

textValidationFields.forEach((field) => {
  field.addEventListener('input', handleInput);
  field.addEventListener('focusout', handleFocusOut);
});

country.addEventListener('change', () => {
  validateFieldWithFeedback(country, true);
});

country.addEventListener('focusout', handleFocusOut);

terms.addEventListener('change', () => {
  validateFieldWithFeedback(terms, true);
});

terms.addEventListener('focusout', handleFocusOut);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validatePasswords();

  fields.forEach((field) => validateFieldWithFeedback(field, true));

  if (!form.checkValidity()) {
    formStatus.textContent = 'Revise los campos marcados antes de registrar.';
    formStatus.classList.add('status-error');
    return;
  }

  const formData = buildFormData();

  console.table(formData);
  formStatus.textContent = 'Registro completado correctamente.';
  formStatus.classList.remove('status-error');
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    validatePasswords();
    clearFormFeedback();
  }, 0);
});
