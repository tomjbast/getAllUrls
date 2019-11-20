const fetch = require('node-fetch')
const async = require('async')

class GetAllUrls {

  /**
   * @param {array<string>} urls
   */
  constructor(urls) {

    /**
     * @type {Array<string>}
     */
    this.urls = urls

    /**
     * @type {Array}
     */
    this.invalidUrls = []

    /**
     * @type {boolean}
     */
    this.shouldDedupe = false

    /**
     * @type {boolean}
     */
    this.shouldUrlCheck = false

    /**
     * @type {number}
     */
    this.concurrency = 10
  }

  /**
   * @param {boolean} shouldDedupe
   * @returns {GetAllUrls}
   */
  dedupe(shouldDedupe) {
    this.shouldDedupe = shouldDedupe

    return this
  }

  /**
   * @param {boolean} shouldCheck
   * @returns {GetAllUrls}
   */
  checkUrlsAreValid(shouldCheck) {
    this.shouldUrlCheck = shouldCheck

    return this
  }

  /**
   * @param {number} concurrency
   * @returns {GetAllUrls}
   */
  setConcurrency(concurrency){
    this.concurrency = concurrency

    return this
  }

  /**
   * @returns {Promise<[object]>}
   */
  async run() {
    if (this.shouldDedupe) {
      // taking the items in the array and putting them into an object will auto dedupe them for us.
      // this reduce is simply taking every url, adding it as a key to an object and giving that key the value of "Key Value"
      const dedupedUrls = this.urls.reduce((acc, curr) => {
        acc[curr] = 'Key Value'

        return acc
      }, {})

      // object.keys will give us all the keys of the object that we can be sure are now unique
      this.urls = Object.keys(dedupedUrls)
    }

    return async.mapLimit(this.urls, this.concurrency, async url => {
      if (this.shouldUrlCheck) {
        // this checks the URL and returns TypeError if invalid as per - https://nodejs.org/docs/latest/api/url.html#url_the_whatwg_url_api
        try {
          new URL(url)
        } catch (e) {
          this.invalidUrls.push(url)
          return {
            error: true,
            errorMessage: 'Invalid URL',
            errorUrl: url
          }
        }
      }

      try {
        const fetchResponse = await fetch(url)
        return fetchResponse.json()
      } catch (e) {
        return {
          error: true,
          errorMessage: e.message,
          errorUrl: url
        }
      }
    })
  }

}

module.exports = GetAllUrls
