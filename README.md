# cookie-mcve

## Instructions

You can test it locally with:

1. `yarn install`
2. `yarn start`
3. Open http://localhost:5002

## `pages/index.js`

We display a basic page which allows us to fetch from an API route `/api/hello` that will set a cookie `MyCookie` with the response.

We use `setServerSideProps` to send the cookie from the server to the frontend.

Follow page's instruction to verify we get the cookie.

## `pages/api/hello.js`

Very basic API that simply set a cookie with the `Set-Cookie` header.
