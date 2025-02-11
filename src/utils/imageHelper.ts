export const getImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
};
