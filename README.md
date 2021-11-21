## Contributing to ChessOpenings.co.uk

1. Fork this repository
2. Clone your forked repository onto your development machine
   ```bash
   git clone https://github.com/yourUsernameHereChessOpenings.git
   cd ChessOpenings
   ```
3. Create a branch for your PR
   ```bash
   git checkout -b feat/cool-new-feature
   ```
4. Set upstream remote
   ```bash
   git remote add upstream https://github.com/Clariity/ChessOpenings.git
   ```
5. Make your changes
6. Push your changes
   ```bash
   git add .
   git commit -m "feat(cool-new-feature): cool new feature description"
   git push --set-upstream origin feat/cool-new-feature
   ```
7. Create pull request on GitHub
8. Contribute again
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b your-new-branch-name
   ```

## Setting up Firebase

1. Go to https://console.firebase.google.com/ and `Add Project`
2. Name it however you wish e.g. `ChessOpenings`
3. Once the project is created, on the `Project Overview` in the console, register a web app...
4. Rest to be completed by Powell (include steps for setting up firebase admin too, and populating the firestore)

## Secrets

A file named `.env.local` is required with the following secrets stored in it:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
DISCORD_WEBHOOK_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

FIREBASE_ADMIN_TYPE=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_PRIVATE_KEY_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_CLIENT_ID=
FIREBASE_ADMIN_AUTH_URI=
FIREBASE_ADMIN_TOKEN_URI=
FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_ADMIN_CLIENT_x509_CERT_URL=
```

## Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
