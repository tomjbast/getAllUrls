async function fetch(url){

  if (url === 'invalid url passed to fetch') {
    throw new Error('Some Error 404/403 etc')
  }

  return {
    json: function() {
      return {
        data: ['A String Here', {object: 123}, 345]
      }
    }
  }
}

module.exports = fetch
