function isInteger(n: string): boolean {
  return /^\d+$/.test(n);
}

function caseStyle(str: string): string {
  if(/^[a-z]+$/.test(str)) {
    return 'lower';
  } else if(/^[A-Z]+$/.test(str)) {
    return 'upper';
  } else if(/^[A-Z][a-z]+$/.test(str)) {
    return 'title';
  }
  return 'unknown';
}
