import request from 'supertest';
import app from '../src/app';
import Comment from '../src/models/commentModel';

jest.mock('../src/models/commentModel');

describe('Comment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('should get all comments', async () => {
    const mockComments = [{ content: 'Comment 1' }, { content: 'Comment 2' }];
    (Comment.find as jest.Mock).mockResolvedValueOnce(mockComments);

    const response = await request(app).get('/api/comments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComments);
  });

  it('should handle error when getting all comments', async () => {
    (Comment.find as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app).get('/api/comments');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });

  it('should create a new comment', async () => {
    const mockCommentData = { content: 'New Comment' };
    const mockCreatedComment = { _id: 'mock-id', ...mockCommentData };
    (Comment.create as jest.Mock).mockResolvedValueOnce(mockCreatedComment);

    const response = await request(app)
      .post('/api/comments')
      .send(mockCommentData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCreatedComment);
  });

  it('should handle error when creating a comment', async () => {
    (Comment.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app)
      .post('/api/comments')
      .send({ content: 'New Comment' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });

  it('should get a comment by ID', async () => {
    const mockCommentId = 'mock-id';
    const mockComment = { _id: mockCommentId, content: 'Mock Comment' };
    (Comment.findById as jest.Mock).mockResolvedValueOnce(mockComment);

    const response = await request(app).get(`/api/comments/${mockCommentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComment);
  });

  it('should handle error when get comment by id api not found', async () => {
    (Comment.findById as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).get('/api/comments/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Comment not found' });
  });


  it('should handle error when getting a comment by ID', async () => {
    (Comment.findById as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app).get('/api/comments/invalid-id');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });


  it('should update an existing comment', async () => {
    const mockCommentId = 'mock-id';
    const updatedCommentData = { content: 'Updated Comment' };
    const updatedComment = { _id: mockCommentId, ...updatedCommentData };
    (Comment.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedComment);

    const response = await request(app)
      .put(`/api/comments/${mockCommentId}`)
      .send(updatedCommentData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedComment);
  });

  it('should handle error when update comment API not found', async () => {
    (Comment.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app)
      .put('/api/comments/invalid-id')
      .send({ content: 'Updated Comment' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Comment not found' });
  });

  it('should handle error when updating a comment', async () => {
    (Comment.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app)
      .put('/api/comments/invalid-id')
      .send({ content: 'Updated Comment' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });


  it('should delete an existing comment', async () => {
    const mockCommentId = 'mock-id';
    const mockDeletedComment = { _id: mockCommentId, content: 'Deleted Comment' };
    (Comment.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockDeletedComment);

    const response = await request(app).delete(`/api/comments/${mockCommentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Comment deleted successfully' });
  });

  it('should handle error when deleting API comment not found', async () => {
    (Comment.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app).delete('/api/comments/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Comment not found' });
  });

  it('should handle error when deleting a comment', async () => {
    (Comment.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app).delete('/api/comments/invalid-id');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Database error' });
  });

});
