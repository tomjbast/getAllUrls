const GetAllUrls = require('../GetAllUrls')

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
  'invalid url passed to fetch',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
]

describe('test GetAllUrls Class', () => {

  it('dedupes urls', async () => {

    const getAllUrls = new GetAllUrls(urls)
    const response = await getAllUrls
      .dedupe(true)
      .run()

    expect(response.length).toBe(urls.length-1)
  })

  it('removes invalid urls', async () => {

    const getAllUrls = new GetAllUrls(urls)
    const response = await getAllUrls
      .checkUrlsAreValid(true)
      .run()

    expect(response.length).toBe(urls.length)

    expect(getAllUrls.invalidUrls).toEqual([
      'invalid url passed to fetch'
    ])

    expect(response[3]).toEqual({
      error: true,
      errorMessage: 'Invalid URL',
      errorUrl: urls[3]
    })
  })

  it('fetch throws error', async () => {

    const getAllUrls = new GetAllUrls(urls)
    const response = await getAllUrls.run()

    expect(response.length).toBe(urls.length)
    expect(response[3]).toEqual({
      error: true,
      errorMessage: 'Some Error 404/403 etc',
      errorUrl: urls[3]
    })
  })

})






