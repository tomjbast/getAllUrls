# FT Get All Urls Task

When provided with an array of URLs GetAllUrls.js will make a request to all urls provided and return the responses in an array. 

### How to use GetAllUrls

To instantiate GetAllUrls follow instructions below, remember to pass in your array of urls to fetch

```
const urls = [
  'www://testurl.com',
  'www://anothertest.com'
  ]
const GetAllUrls = require('./GetAllUrls')
const getAllUrls = new GetAllUrls(urls)

const data = await getAllUrls.run()
// do something with data variable
```

GetAllUrls contains two methods that can be called to validate the array input. These are used by passing true to the respective methods. (Note: both options are defaulted to false so true MUST be passed if you wish to make use of either.)

```
const data = await getAllUrls
  .shouldDedupe(true)
  .checkUrlsAreValid(true)
  .run()
```

If the input array contains duplicate urls and `shouldDedupe(true)` has been called all duplicate urls will be ignored and removed from the url array input.

If the input array contains any invalid urls and `checkUrlsAreValid(true)` has been called invalid urls will return a response as below in place of any JSON data from a request. 

```
{
  error: true,
  errorMessage: 'Invalid URL',
  errorUrl: url
}
```

Further `getAllUsers.invalidUrls` is an array of all urls deemed to be invalid. (Calling `getAllUsers.invalidUrls.length` is a quick way to determine if any urls errored when providing many urls to `getAllUsers()`)

### Run Tests

```
npm test
```

### Next Steps

As the package is written as a class it would be incredibly easy to expand its functionality. You could add a rate limiter so only a certain number of requests could be executed at a time, or add further config if users wanted all errors removed from the response array etc.
