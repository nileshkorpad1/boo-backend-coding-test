import request from 'supertest';
import app from '../src/app';
import Comment from '../src/models/commentModel';

jest.mock('../src/models/commentModel');

describe('Comment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all comments', async () => {
    const mockComments = [{ _id: '1', content: 'Comment 1' }, { _id: '2', content: 'Comment 2' }];
    (Comment.find as jest.Mock).mockResolvedValueOnce(mockComments);

    const response = await request(app).get('/api/comments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComments);
  });

  it('should create a new comment', async () => {
    const mockContent = 'New comment';
    const mockComment = { _id: '1', content: mockContent };
    (Comment.create as jest.Mock).mockResolvedValueOnce(mockComment);

    const response = await request(app)
      .post('/api/comments')
      .send({ content: mockContent });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockComment);
  });

  it('should get a comment by ID', async () => {
    const mockCommentId = '1';
    const mockComment = { _id: mockCommentId, content: 'Mock comment' };
    (Comment.findById as jest.Mock).mockResolvedValueOnce(mockComment);

    const response = await request(app).get(`/api/comments/${mockCommentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockComment);
  });

  it('should update an existing comment', async () => {
    const mockCommentId = '1';
    const mockUpdatedContent = 'Updated comment';
    const mockUpdatedComment = { _id: mockCommentId, content: mockUpdatedContent };
    (Comment.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockUpdatedComment);

    const response = await request(app)
      .put(`/api/comments/${mockCommentId}`)
      .send({ content: mockUpdatedContent });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedComment);
  });

  it('should delete an existing comment', async () => {
    const mockCommentId = '1';
    const mockDeletedComment = { _id: mockCommentId, content: 'Deleted comment' };
    (Comment.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockDeletedComment);

    const response = await request(app).delete(`/api/comments/${mockCommentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Comment deleted successfully' });
  });
});
