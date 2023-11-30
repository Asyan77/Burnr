export const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET';
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
      options.headers['X-CSRF-Token'] ||= sessionStorage.getItem('X-CSRF-Token');
      // if(!(options.body instanceof formData)) {
      options.headers['Content-Type'] ||= 'application/json'
      options.headers['Accept'] ||= 'application/json'
      // }
     }

     console.log(options, "options")
    const res = await fetch(url, options);
    return res;
 };


  export const restoreSession = async () => {
    try {
      const res = await csrfFetch('/api/session')
      const token = res.headers.get('X-CSRF-Token')
      // if (res.ok) {
        const data = await res.json()
        sessionStorage.setItem('currentUser', JSON.stringify(data.user))
        sessionStorage.setItem('X-CSRF-Token', token)
      // } else {
        // throw res
      // }
    } catch (err) {
      console.error(err, 'restoreSession is broken')
    }
  }
    