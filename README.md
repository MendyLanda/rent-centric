# Unofficial Rent Centric API Client

## Installation

```bash
npm install rent-centric
```

## Usage

To create an instance of the RentCentricApiClient, you need to provide the following parameters:

- email: The email address of the user
- password: The password of the user
- activationCode: A 6 letter activation code that is provided by Rent Centric (you can get it by contacting Rent Centric support)

```javascript
import { RentCentricApiClient } from "rent-centric";

const client = await RentCentricApiClient.createInstance({
    email: "joe@example.com",
    password: "password",
    activationCode: "123456",
  });
```

Then you can use the client to interact with the Rent Centric API. For example, to search for rentals:

```javascript
const rentals = await client.rental.search({
    firstName: "Mendy",
    lastName: "Landa",
  });
```
