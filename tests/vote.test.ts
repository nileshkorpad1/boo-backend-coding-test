import request from 'supertest';
import app from '../src/app';
import Profile from '../src/models/profileModel'; // Import the Profile model
import Vote from '../src/models/voteModel';

jest.mock('../src/models/profileModel');
jest.mock('../src/models/voteModel');

describe('Vote Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit a vote successfully', async () => {
    const mockProfileId = '1';
    const mockProfile = { _id: mockProfileId, name: 'John Doe' };
    (Profile.exists as jest.Mock).mockResolvedValueOnce(true);
    const mockVote = { _id: '1', profileId: mockProfileId, personalitySystem: 'MBTI', personalityType: 'INTJ' };
    (Vote.prototype.save as jest.Mock).mockResolvedValueOnce(mockVote);

    const response = await request(app)
      .post('/api/votes')
      .send({ profileId: mockProfileId, personalitySystem: 'MBTI', personalityType: 'INTJ' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Vote submitted successfully' });
  });

  it('should return 404 if profile does not exist', async () => {
    const mockProfileId = '1';
    (Profile.exists as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/api/votes')
      .send({ profileId: mockProfileId, personalitySystem: 'MBTI', personalityType: 'INTJ' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Profile not found' });
  });

  it('should handle internal server error', async () => {
    const mockProfileId = '1';
    (Profile.exists as jest.Mock).mockRejectedValueOnce(new Error('Internal server error'));

    const response = await request(app)
      .post('/api/votes')
      .send({ profileId: mockProfileId, personalitySystem: 'MBTI', personalityType: 'INTJ' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
  });
});
