# Yet Another Url Shortener

## Table of Contents
- [Yet Another Url Shortener](#yet-another-url-shortener)
  - [Table of Contents](#table-of-contents)
  - [About the project](#about-the-project)
    - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Features](#features)
  - [Contributing](#contributing)
  - [Contact](#contact)

## About the project

A URL shortener api only app with custom URL support.

### Built With

* [Nodejs](https://nodejs.org)
* [PostgreSQL](https://www.postgresql.org)

## Getting Started

### Prerequisites

Nodejs and PostgreSQL

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/sinmrinal/yaus.git
   ```

2. Install NPM packages

   ```sh
   npm i
   ```

3. Create a `.env` file in root directory of the project.

   ```sh
    PGUSER= "Postgres username"
    PGHOST= "Postgres host"
    PGPASSWORD= "Postgres password"
    PGDATABASE= "Postgres database"
    PGPORT= "Postgres port"
    PORT= "App port"
   ```

4. Start the project

   ```sh
   npm start
   ```

## Features

1. Custom URLs. :heavy_check_mark:
2. Auto-generated URLs. :heavy_check_mark:
3. Caching (LFU based evection). (WIP)
4. Auto delete expired URLs. (WIP)
5. Analytics with URL hits and geolocation. (WIP)


## Contributing


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'feat: added feature'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

## Contact

Mrinal Singh - [@linkedin](https://linkedin.com/in/sinmrinal) - [mrinal_singh@outlook.com](mailto:mrinal_singh@outlook.com)