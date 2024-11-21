import express from 'express';
import cors from 'cors';
import {
  generateRegistrationOptions,
  generateAuthenticationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (replace with your database in production)
const userAuthenticators = new Map();

const rpName = 'Auth Demo';
const rpID = 'localhost';
const origin = `http://${rpID}:5173`;

app.post('/generate-registration-options', (req, res) => {
  const userId = 'test-user';
  const options = generateRegistrationOptions({
    rpName,
    rpID,
    userID: userId,
    userName: 'test@example.com',
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
      authenticatorAttachment: 'platform',
    },
  });

  // Save challenge for verification
  userAuthenticators.set(userId, { currentChallenge: options.challenge });

  res.json(options);
});

app.post('/verify-registration', async (req, res) => {
  const userId = 'test-user';
  const expectedChallenge = userAuthenticators.get(userId).currentChallenge;

  try {
    const verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credentialPublicKey, credentialID, counter } = registrationInfo;

      const existingDevice = userAuthenticators.get(userId) || {};
      existingDevice.credentialID = credentialID;
      existingDevice.credentialPublicKey = credentialPublicKey;
      existingDevice.counter = counter;
      userAuthenticators.set(userId, existingDevice);

      res.json({ verified: true });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/generate-authentication-options', (req, res) => {
  const userId = 'test-user';
  const userAuthenticator = userAuthenticators.get(userId);

  if (!userAuthenticator?.credentialID) {
    res.status(400).json({ error: 'No authenticator registered for this user' });
    return;
  }

  const options = generateAuthenticationOptions({
    rpID,
    allowCredentials: [{
      id: userAuthenticator.credentialID,
      type: 'public-key',
      transports: ['internal'],
    }],
    userVerification: 'preferred',
  });

  userAuthenticator.currentChallenge = options.challenge;
  userAuthenticators.set(userId, userAuthenticator);

  res.json(options);
});

app.post('/verify-authentication', async (req, res) => {
  const userId = 'test-user';
  const userAuthenticator = userAuthenticators.get(userId);

  try {
    const verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: `${userAuthenticator.currentChallenge}`,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        credentialPublicKey: userAuthenticator.credentialPublicKey,
        credentialID: userAuthenticator.credentialID,
        counter: userAuthenticator.counter,
      },
    });

    const { verified, authenticationInfo } = verification;

    if (verified) {
      userAuthenticator.counter = authenticationInfo.newCounter;
      userAuthenticators.set(userId, userAuthenticator);
    }

    res.json({ verified });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});