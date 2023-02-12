export const fetchWithHeaders = async (url: string) => {
  function isValidAPIURL(str: string) {
    const pattern = new RegExp(
      '^https://[a-z0-9.-]+/api/v1/accounts/[0-9]+/following(\\?max_id=[0-9]+)?$',
    );
    return pattern.test(str);
  }

  let nextLink = url;
  let data: any[] = [];

  while (isValidAPIURL(nextLink)) {
    const res = await $fetch.raw(nextLink);
    const links = (res.headers.get('link') || '').split(',');

    nextLink =
      links
        .find(e => e.includes('rel="next"'))
        ?.split(';')[0]
        .slice(1, -1) ?? '';

    data.push(...(res._data as any[]));
  }

  return { data };
};
