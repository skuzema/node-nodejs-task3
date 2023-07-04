export function chkUserFields(username: unknown, age: unknown, hobbies: unknown): boolean {
  return (
    typeof username !== 'string' ||
    typeof age !== 'number' ||
    !Array.isArray(hobbies)
  );
}
