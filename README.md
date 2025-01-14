This is a sample React Native app to browse and display news from MediaStack.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions.

## Step 1: Get your API Key
Create a new API key on mediastack website https://mediastack.com

## Step 2: Create the local ENV file
This app read some values from the local env file, create a new file as `.env` at project root folder and add these lines:
```bash
BASE_API_URL=https://api.mediastack.com/v1
API_KEY=[your mediastack api key]
```

## Step 3: Install Dependencies

```bash
# using npm
npm setup

# OR using Yarn
yarn setup
```

## Step 4: Start the Metro Server

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 5: Start your Application

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```


