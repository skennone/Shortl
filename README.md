# URL Shortener Project

## How to run the Project
To run the project locally, clone the repo
`git@github.com:skennone/Shortl.git`

Run the following commands from the provided `Makefile` to run the project

`make run`

alternatively use `docker compose` directly

`docker compose up --build --no-recreate -d client api redis`

Open your browser at `http://localhost:4242` and use the web app to generate short url's.

To generate a short URL, enter any url in the first input field and in the second input field
enter a userID and click `Shorten URL`

When you visit the short URL you'll be redirected to the original URL you shortened.

## TODO:

- [ ] add DB for cold values/least frequently fetched data
- [ ] add /register & /login endpoints
- [ ] userID should be generated from /register
- [x] dockerize application
