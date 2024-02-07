import request from 'supertest';
import app from '../src/app';
import Profile from '../src/models/profileModel'; // Import Profile model
import {
  getAllProfiles,
  getProfileById
} from '../src/controllers/profileController';

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

   it('should handle error when getting all profiles', async () => {
    // Mock error
    const errorMessage = 'Database error';
    (Profile.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Mock Request and Response objects
    const req:any = {} as Request;
    const res:any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call getAllProfiles function
    await getAllProfiles(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
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

    it('should handle error when creating a profile', async () => {
    // Mock error
    const errorMessage = 'Database error';
    (Profile.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Send request
    const response = await request(app)
      .post('/api/profiles')
      .send({ name: 'New Profile' });

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });

  it('should get a profile by ID', async () => {
    const mockProfileId = 'mock-id';
    const mockProfile = { _id: mockProfileId, name: 'Mock Profile' };
    (Profile.findById as jest.Mock).mockResolvedValueOnce(mockProfile);

    const response = await request(app).get(`/api/profiles/${mockProfileId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProfile);
  });

  it('should handle profile not found error', async () => {
    // Mock profile not found
    const req:any = { params: { id: 'non-existent-id' } } as unknown as Request;
    const res:any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call getProfileById function
    await getProfileById(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Profile not found' });
  });

    it('should handle error when getting a profile by ID', async () => {
    // Mock error
    const errorMessage = 'Database error';
    (Profile.findById as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Send request
    const response = await request(app).get('/api/profiles/invalid-id');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });

  it('should update an existing profile', async () => {
    // Mock data
    const mockProfileId = 'mock-id';
    const updatedProfileData = { name: 'Updated Profile' };
    const updatedProfile = { _id: mockProfileId, ...updatedProfileData };
    (Profile.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedProfile);

    // Send request
    const response = await request(app)
      .put(`/api/profiles/${mockProfileId}`)
      .send(updatedProfileData);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedProfile);
  });

  it('should return 404 if profile to update is not found', async () => {
    // Mock data
    const mockProfileId = 'non-existent-id';
    (Profile.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    // Send request
    const response = await request(app)
      .put(`/api/profiles/${mockProfileId}`)
      .send({ name: 'Updated Profile' });

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Profile not found' });
  });

  it('should handle error when updating a profile', async () => {
    // Mock error
    const errorMessage = 'Database error';
    (Profile.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Send request
    const response = await request(app)
      .put('/api/profiles/invalid-id')
      .send({ name: 'Updated Profile' });

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });

  it('should delete an existing profile', async () => {
    // Mock data
    const mockProfileId = 'mock-id';
    const mockDeletedProfile = { _id: mockProfileId, name: 'Deleted Profile' };
    (Profile.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockDeletedProfile);

    // Send request
    const response = await request(app).delete(`/api/profiles/${mockProfileId}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Profile deleted successfully' });
  });

it('should return 404 if profile to delete is not found', async () => {
    // Mock data
    const mockProfileId = 'non-existent-id';
    (Profile.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    // Send request
    const response = await request(app).delete(`/api/profiles/${mockProfileId}`);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Profile not found' });
  });

  it('should handle error when deleting a profile', async () => {
    // Mock error
    const errorMessage = 'Database error';
    (Profile.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Send request
    const response = await request(app).delete('/api/profiles/invalid-id');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });

});
