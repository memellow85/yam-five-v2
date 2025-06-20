// Validazione indirizzo mail
export const validatorEmail = (email: string): boolean => {
  const regexEmail =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexEmail.test(email)
}

// Validazione password in base alle seguenti regole
// Min 8 caratteri
// Deve esserci almeno 1 numero
// Deve esserci almeno una lettera maiuscola e una minuscola
// Deve esserci almeno 1 simbolo tra @$!%*?&
export const validatorPassword = (password: string): boolean => {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regexPassword.test(password)
}

// Genera un numero random da 1 a 6
export const getRandomNumber = (limit: number = 6): number => {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return (array[0] % limit) + 1
}
