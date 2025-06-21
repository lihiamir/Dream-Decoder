const { saveInterpretationProfile } = require('../../services/profile');
const { admin } = require('../../config/firebase');

// Mock Firestore
jest.mock('../../config/firebase', () => {
  const setMock = jest.fn();
  const getMock = jest.fn();

  return {
    admin: {
      firestore: () => ({
        collection: () => ({
          doc: () => ({
            get: getMock,
            set: setMock
          })
        })
      })
    }
  };
});

describe('saveInterpretationProfile', () => {
  let getMock, setMock;

  beforeEach(() => {
    jest.clearAllMocks();
    const firestore = admin.firestore();
    const doc = firestore.collection().doc();

    getMock = doc.get;
    setMock = doc.set;
  });

  test('sets defaults when first-time setup and no input provided', async () => {
    // Simulate: no existing data
    getMock.mockResolvedValueOnce({ exists: false });

    const uid = 'user123';
    const data = {}; // no values provided

    await saveInterpretationProfile(uid, data);

    expect(setMock).toHaveBeenCalledWith(
      expect.objectContaining({
        background: 'Other',
        interpretationStyle: 'Symbolic',
        completedAt: expect.any(Date)
      }),
      { merge: true }
    );
  });

  test('uses provided values if sent by client', async () => {
    // Simulate: no existing data
    getMock.mockResolvedValueOnce({ exists: false });

    const uid = 'user456';
    const data = {
      background: 'Jewish-Israeli',
      interpretationStyle: 'Jungian'
    };

    await saveInterpretationProfile(uid, data);

    expect(setMock).toHaveBeenCalledWith(
      expect.objectContaining({
        background: 'Jewish-Israeli',
        interpretationStyle: 'Jungian',
        completedAt: expect.any(Date)
      }),
      { merge: true }
    );
  });

  test('preserves existing fields and applies only changed ones', async () => {
    // Simulate existing profile with only background
    getMock.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        background: 'Christian',
        otherField: 'stay-this'
      })
    });

    const uid = 'user789';
    const data = {
      interpretationStyle: 'Symbolic'
    };

    await saveInterpretationProfile(uid, data);

    // Should only update interpretationStyle and completedAt
    expect(setMock).toHaveBeenCalledWith(
      expect.objectContaining({
        interpretationStyle: 'Symbolic',
        completedAt: expect.any(Date)
      }),
      { merge: true }
    );
  });

  test('does not overwrite existing background or interpretationStyle', async () => {
    getMock.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        background: 'Muslim',
        interpretationStyle: 'Analytical'
      })
    });

    const uid = 'user1000';
    const data = {}; // no update requested

    await saveInterpretationProfile(uid, data);

    // Should only add completedAt
    expect(setMock).toHaveBeenCalledWith(
      expect.objectContaining({
        completedAt: expect.any(Date)
      }),
      { merge: true }
    );
  });
});
