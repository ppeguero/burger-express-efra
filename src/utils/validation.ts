export function isValidEmail(email: string): boolean {
  const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email.trim());
}

export function sanitizeMessage(message: string): string {
  return message
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/(SELECT|INSERT|UPDATE|DELETE|DROP|--)/gi, "")
    .trim();
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
