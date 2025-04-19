
export function fieldValidate(fieldName, value) {
  let message = '';

  if (fieldName === 'email') {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.trim()) {
      message = 'O e-mail não pode ficar em branco.';
    } else if (!regex.test(value.trim().toLowerCase())) {
      message = 'E-mail inválido.';
    }
  }
  return message;
}

export function isNotValid(formData, formErrors) {
  const hasError = Object.values(formErrors).some((err) => err.trim() !== '');
  const requiredFields = [formData.email];
  const hasEmpty = requiredFields.some((field) => !field || field.trim() === '');
  return hasEmpty || hasError;
}