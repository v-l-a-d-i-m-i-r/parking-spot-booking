export function extractTokenFromHeader(request: {
  headers?: { [key: string]: string } | undefined;
}): string | undefined {
  const [type, token] = request.headers?.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
