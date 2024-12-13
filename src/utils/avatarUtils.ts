export function getAvatarUrl(name: string): string {
  const encodedName = encodeURIComponent(name);
  return `https://api.dicebear.com/6.x/initials/svg?seed=${encodedName}`;
}

