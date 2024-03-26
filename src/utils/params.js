import qs from 'qs';

export const handleParams = params =>
  qs.stringify(params, {addQueryPrefix: true});
