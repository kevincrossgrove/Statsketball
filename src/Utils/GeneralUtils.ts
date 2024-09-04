// For now, just console logging an error
// In the future, we can logging to Sentry or our own error logging service
export function AppError(message: string) {
  console.log(message);
}
