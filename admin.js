// admin.js
export const ADMIN_PASSWORD = "1234";

export function checkAdmin(password) {
  return password === ADMIN_PASSWORD;
}
