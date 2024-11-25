# PUIPUI Fashion Website

Welcome to the PUIPUI fashion website! This project is part of a software metrics course, focusing on controlling code quality and ensuring better maintenance in the future. PUIPUI is built using Vite/Vue and Deno 2.0.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (for `npm` package management)
- [Deno 2.0](https://deno.land/)

## Installation

Follow these steps to set up the environment and run the PUIPUI website.

### Step 1: Clone the Repository

```sh
git clone https://github.com/your-username/puipui.git
cd puipui
```

### Step 2: Install Dependencies
```sh
npm install
```

### Step 3: Download and Install Deno 2.0
Windows
```sh
irm https://deno.land/install.ps1 | iex
```
macOS
```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```
### Running the server
To start the server, use the following command:
```sh
deno run --allow-net --allow-env --env-file=backend/.env backend/server.js
```
This command grants the necessary permissions for network access and environment variables, and it specifies the location of your environment file.

### Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

### License 
Distributed under the MIT License. See LICENSE for more information
