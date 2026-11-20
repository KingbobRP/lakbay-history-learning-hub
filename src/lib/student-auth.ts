/**
 * Students log in with full name + class code + PIN (no email or phone).
 * These are turned into a private sign-in identity the backend understands.
 */
export function normalizeName(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ñ/g, "n").replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");
}
export function normalizeCode(code: string) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, "");
}
export function studentEmail(fullName: string, classCode: string) {
  return `${normalizeName(fullName)}.${normalizeCode(classCode)}@mag-aaral.historia.app`;
}
export function studentPassword(pin: string) {
  return `historia-pin-${pin}`;
}
export function validPin(pin: string) {
  return /^\d{4,6}$/.test(pin);
}
