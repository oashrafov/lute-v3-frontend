<h1 align="center">
  <img src="public/images/logo.png" style="vertical-align: -6px" width="48"  />
  Lute 3 React Frontend
</h1>

[Lute](https://github.com/LuteOrg/lute-v3) (Learning Using Texts) is a web application for learning languages by reading texts. The core application is written in Python/Flask.
This repo adds React frontend which works with backend's API endpoints.

 <img src="public/images/screenshot.png" style="vertical-align: -6px" width="1280"  />

Demo: https://lute-v3-frontend.onrender.com _(might need up to a minute for the server to spin up)_

## Built With

![React](https://img.shields.io/badge/React%20-%20%23169ac4?style=for-the-badge&logo=react&logoColor=fff)
![TypeScript](https://img.shields.io/badge/TypeScript%20-%20%233178c6?style=for-the-badge&logo=typescript&logoColor=fff)
![TanStack Router](https://img.shields.io/badge/Router%20-%20%2300bc7d?style=for-the-badge&logo=tanstack&logoColor=fff)
![TanStack Query](https://img.shields.io/badge/Query%20-%20%23fb2c36?style=for-the-badge&logo=tanstack&logoColor=fff)
![Mantine](https://img.shields.io/badge/Mantine%20-%20%23339af0?style=for-the-badge&logo=mantine&logoColor=fff)
![React Hook Form](https://img.shields.io/badge/Hook%20Form%20-%20%23ec5990?style=for-the-badge&logo=reacthookform&logoColor=fff)
![Zod](https://img.shields.io/badge/Zod%20-%20%232b7fff?style=for-the-badge&logo=zod&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite%20-%20%23b39aff?style=for-the-badge&logo=vite&logoColor=fff)

## Installation

Installation will be in two parts. First we install the backend with API endpoints and then this frontend app.

### Backend

Use the `api` branch from the below repo. See installation instructions [here](https://github.com/LuteOrg/lute-v3/wiki/Development).

```
https://github.com/oashrafov/lute-v3/tree/api
```

Install backend and launch it.

### Frontend

Clone this repo.

```sh
git clone https://github.com/oashrafov/lute-v3-frontend.git
```

`cd` into `lute-v3-frontend` and install packages.

```sh
npm install
```

Create an `.env` file in the root folder and fill in the backend url.

```js
VITE_BACKEND_URL=
```

_Note: This is the url that core Lute runs at. Default is `http://localhost:5001`_

Build the app.

```sh
npm run build
```

Launch the server.

```sh
npm run preview
```

Your app should be live at http://localhost:4173
