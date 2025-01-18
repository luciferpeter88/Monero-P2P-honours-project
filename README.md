# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

# Project Introduction

This project focuses on creating a peer-to-peer trading platform for Monero (XMR), providing users with a secure and transparent environment for trading. Inspired by platforms like LocalBitcoins, this platform enables users to create buy or sell offers for Monero. Transactions are facilitated through direct bank transfers, ensuring that fiat money is sent directly to the seller. Once the seller confirms receipt of the payment, Monero is transferred to the buyer’s wallet on the platform.

## Key Features

- **User Wallets**: Each user has an integrated wallet within the platform to store, send, and receive Monero securely.
- **Buy/Sell Offers**: Users can create and browse offers to trade Monero with potential partners.
- **Messaging System**: A chat feature for seamless communication between users during trades.

## Technology Stack

1. **Python**: Handles Monero-related tasks, such as transaction processing and integration with the Monero network.
2. **PostgreSQL**: Manages structured data, including user profiles, transaction histories, and offer listings.
3. **MongoDB**: Stores dynamic and unstructured data like chat logs for faster retrieval and scalability.
4. **Remix.js**: Acts as the backend framework, leveraging React for server-side rendering, routing, and data loading. It also handles dynamic routing and interactions with the backend APIs to provide a seamless experience.
5. **React**: Ensures a responsive and interactive user interface on the frontend.

## Security and Transparency

The platform prioritizes security through **multi-factor authentication (MFA)** to safeguard user accounts. All transactions, both fiat and Monero, are carefully tracked to ensure clarity and transparency during the trading process.

## Project Milestones

### Passable Project

- User registration and login functionality.
- Buy/sell offer creation and management.
- Basic messaging system for user communication.
- PostgreSQL for structured data storage.
- MongoDB for chat logs and dynamic data storage.

### First-Class Project

- Multi-factor authentication (MFA) for enhanced security.
- Rating and feedback system for trading partners.
- Real-time chat system using WebSockets.
- Scalable transaction history management in MongoDB.
