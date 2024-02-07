import request from 'supertest';
import app from '../src/app'; // Assuming this is the entry point of your Express application
import Profile from '../src/models/profileModel'; // Import your Profile model

jest.mock('../src/models/profileModel'); // Mock the Profile model

describe('Profile Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should get all profiles', async () => {
    const mockProfiles = [{ name: 'Profile 1' }, { name: 'Profile 2' }];
    (Profile.find as jest.Mock).mockResolvedValueOnce(mockProfiles);

    const response = await request(app).get('/api/profiles');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfiles);
  });

  it('should create a new profile', async () => {
    const mockProfileData = { name: 'New Profile' };
    const mockCreatedProfile = { _id: 'mock-id', ...mockProfileData };
    (Profile.create as jest.Mock).mockResolvedValueOnce(mockCreatedProfile);

    const response = await request(app)
      .post('/api/profiles')
      .send(mockProfileData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCreatedProfile);
  });

  it('should get a profile by ID', async () => {
    const mockProfileId = 'mock-id';
    const mockProfile = { _id: mockProfileId, name: 'Mock Profile' };
    (Profile.findById as jest.Mock).mockResolvedValueOnce(mockProfile);

    const response = await request(app).get(`/api/profiles/${mockProfileId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfile);
  });

  it('should update an existing profile', async () => {
    const mockProfileId = 'mock-id';
    const updatedProfileData = { name: 'Updated Profile' };
    const updatedProfile = { _id: mockProfileId, ...updatedProfileData };
    (Profile.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedProfile);

    const response = await request(app)
      .put(`/api/profiles/${mockProfileId}`)
      .send(updatedProfileData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProfile);
  });

  it('should delete an existing profile', async () => {
    const mockProfileId = 'mock-id';
    const mockDeletedProfile = { _id: mockProfileId, name: 'Deleted Profile' };
    (Profile.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockDeletedProfile);

    const response = await request(app).delete(`/api/profiles/${mockProfileId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Profile deleted successfully' });
  });

});
