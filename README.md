# ITAS 192 Final Project

## View Live Demo
[Demo](http://165.22.12.9:5173)
- Login and register is working, feel free to make an account (although it adds no extra functionality than accessing the 'accounts' page)

## Backstory

I have used a service called Next Episode for the past few years as a means to track current TV shows so I can update my Plex library on time and keep track of the shows I love. I bought a one time license for the service through their mobile app. However, they recently changed their licensing model and the web app is a totally different subscription without a lifetime lisence. So, i have decided to make my own version of the app.

## API's 

In this project I was planning to use [The Movie Database](https://www.themoviedb.org) and [The TV Database](https://thetvdb.com). After starting off with TMDB I realized it also contained all the required endpoints for accessing TV information. As a second API call I created my own simple login / register API using Node.JS
I have this API hosted in a Digital Ocean droplet along with a managed PostgreSQL database. 

## Further Content/Features

As it stands right now, this version of the app is far from complete. I would like to see the following features added in the future:

- A more robust api as it seems the fields change on newer shows and some information is not displayed
- The ability for a user to add shows to a watchlist
- sms/email notifications for when a new episode is released
- A customized for you page that will recommend shows to follow based on your watchlist
- A way to browse shows and movies by streaming platform (my parter wont cancel our Netflix subscription because she likes to 'browse')
- integration with IMDB or similar platform to get more information about the show/movie (overall I am not a huge fan of TMDB)
- Links to download _Totally Legal Linux distros_ using URL params. (currently clicking on the shows previous episode name and season number will copy it to the clipboard)
- Having a list of unwatched episodes for each show stored in the watchlist that can be individually marked as watched
- Move all API calls to the backend and have the frontend make calls to the backend

## Sources

- [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)
- [Vite Documentation](https://vitejs.dev/guide/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/15/index.html)
- [ChatGPT](https://chat.openai.com/) (used for debugging)
- [TailwindCSS](https://tailwindcss.com/docs)

## Course Feedback

I think this course was structured very well. I really enjoyed that we dove right into using frameworks such as React as this is a really employable skill. I would like to have seen some basic database integation, I know this is a client side class however a lab that included a simple SQL or Firebase database would go along way in a students understanding of building a fully functional web app.
