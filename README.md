# Laureate

This proyects comes in two parts, the frontend based on Reactjs/fetch calls, and a backend
using Nodejs and Express;

## Frontend

To start the webserver you'll have to build it first using:

    `yarn run build`
    
After that you need to using a web server to serve the static files, maybe with the serve package, or
using a weserver like Apache or Nginx.

    `serve -s build -p 3000`

OR you can just run it in development:

    `yarn run start`

## Backend

To start the webserver for production just run:

    `yarn build && yarn start`

or you can just run it in development using:

    `yarn watch && yarn run dev`

You can change the port in the .env, and the callback url which connects to the frontend/client
