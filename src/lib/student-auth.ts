export function normalizeName(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ñ/g, "n").replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");
}

export function normalizeCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function studentEmail(fullName: string, classCode: string) {
  return `${normalizeName(fullName)}.${normalizeCode(classCode)}@mag-aaral.historia.app`;
}

export function usernameEmail(username: string) {
  return `${username.trim().toLowerCase()}@mag-aaral.historia.app`;
}

export function studentPassword(pin: string) {
  return `historia-pin-${pin}`;
}

export function validPin(pin: string) {
  return /^\d{4,6}$/.test(pin);
}

export function validUsername(username: string) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]{2,19}$/.test(username.trim());
}
