const mapping: Record<string, string> = {
  companies: 'company',
  events: 'event',
  renamedfunctions: 'Renamedfunction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
