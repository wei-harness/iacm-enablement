export const testHarnessUser = (user: any) =>
  user && (user.email || '').endsWith('@harness.io')
