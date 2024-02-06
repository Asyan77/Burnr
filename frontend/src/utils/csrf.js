export const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET';
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
      options.headers['X-CSRF-Token'] ||= sessionStorage.getItem('X-CSRF-Token');
      if(!(options.body instanceof FormData)) {
      options.headers['Content-Type'] ||= 'application/json'
      options.headers['Accept'] ||= 'application/json'
    }
     }
    const res = await fetch(url, options);
    // const text = await res.text()
    return res;
 };

export const restoreSession = async () => {
  try {
    const res = await csrfFetch('/api/session')
    const token = res.headers.get('X-CSRF-Token')
    const data = await res.json()
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    sessionStorage.setItem('X-CSRF-Token', token)
  } catch (err) {
    console.error(err, 'restoreSession is broken')
  }
}
    