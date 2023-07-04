import request from 'supertest';
import dotenv from 'dotenv';
import { URL, STATUS_CODE, MESSAGE } from '../data/constants';

dotenv.config();
const port = process.env.PORT || 3000;
const app = `http://localhost:${port}`;

describe('Scenario #1', () => {
  let createdUserId: string;

  it('should get all records with a GET api/users request', async () => {
    const response = await request(app).get(URL.users);
    expect(response.status).toBe(STATUS_CODE.success);
    expect(response.body).toEqual([]);
  });

  it('should create a new object with a POST api/users request', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: 25,
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(app).post(URL.users).send(newUser);
    expect(response.status).toBe(STATUS_CODE.created);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.age).toBe(newUser.age);
    expect(response.body.hobbies).toEqual(newUser.hobbies);
    createdUserId = response.body.id;
  });

  it('should get the created record by its id with a GET api/users/{userId} request', async () => {
    const response = await request(app).get(`${URL.user_id}${createdUserId}`);
    expect(response.status).toBe(STATUS_CODE.success);
    expect(response.body.id).toBe(createdUserId);
  });

  it('should update the created record with a PUT api/users/{userId} request', async () => {
    const updatedUser = {
      username: 'UpdatedJohnDoe',
      age: 30,
      hobbies: ['Reading', 'Sports'],
    };

    const response = await request(app)
      .put(`${URL.user_id}${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(STATUS_CODE.success);
    expect(response.body.id).toBe(createdUserId);
    expect(response.body.username).toBe(updatedUser.username);
    expect(response.body.age).toBe(updatedUser.age);
    expect(response.body.hobbies).toEqual(updatedUser.hobbies);
  });

  it('should delete the created object by id with a DELETE api/users/{userId} request', async () => {
    const response = await request(app).delete(
      `${URL.user_id}${createdUserId}`
    );
    expect(response.status).toBe(STATUS_CODE.no_content);
  });

  it('should not find the deleted object with a GET api/users/{userId} request', async () => {
    const response = await request(app).get(`${URL.user_id}${createdUserId}`);
    expect(response.status).toBe(STATUS_CODE.not_found);
    expect(response.body.message).toBe(MESSAGE.user_not_found);
  });
});

describe('Scenario #2', () => {
  let createdUserId: string;
  it('should return 404 for non-existing endpoints', async () => {
    const response = await request(app).get('/aaa/bbb/ccc');
    expect(response.status).toBe(STATUS_CODE.not_found);
    expect(response.body.message).toBe(MESSAGE.not_found);
  });

  it('should return Invalid data (400) for incorrect name type in POST request', async () => {
    const newUser = {
      username: 111,
      age: 25,
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(app).post(URL.users).send(newUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_data);
  });

  it('should return Invalid data (400) for incorrect age type in POST request', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: '25',
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(app).post(URL.users).send(newUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_data);
  });

  it('should return Invalid data (400) for incorrect hobbies type in POST request', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: 25,
      hobbies: 'Reading',
    };

    const response = await request(app).post(URL.users).send(newUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_data);
  });

  it('should create a new object with a POST api/users request', async () => {
    const newUser = {
      username: 'JohnDoe',
      age: 25,
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(app).post(URL.users).send(newUser);
    expect(response.status).toBe(STATUS_CODE.created);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.age).toBe(newUser.age);
    expect(response.body.hobbies).toEqual(newUser.hobbies);
    createdUserId = response.body.id;
  });

  it('should return Invalid data (400) for incorrect name type in PUT request', async () => {
    const updatedUser = {
      username: 111,
      age: 25,
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(app)
      .put(`${URL.user_id}${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_data);
  });

  it('should return Invalid data (400) for incorrect age type in PUT request', async () => {
    const updatedUser = {
      username: 'JohnDoe',
      age: '25',
      hobbies: ['Reading', 'Gaming'],
    };

    const response = await request(app)
      .put(`${URL.user_id}${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_data);
  });

  it('should return Invalid data (400) for incorrect hobbies type in PUT request', async () => {
    const updatedUser = {
      username: 'JohnDoe',
      age: 25,
      hobbies: 'Reading',
    };

    const response = await request(app)
      .put(`${URL.user_id}${createdUserId}`)
      .send(updatedUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_data);
  });
});

describe('Scenario #3', () => {
  it('try to get a record with an invalid userId (400 error)', async () => {
    const response = await request(app).get(`${URL.user_id}1111`);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_uuid);
  });

  it('try to update a record with an invalid userId (400 error)', async () => {
    const updatedUser = {
      username: 'UpdatedJohnDoe',
      age: 30,
      hobbies: ['Reading', 'Sports'],
    };
    const response = await request(app)
      .put(`${URL.user_id}1111`)
      .send(updatedUser);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_uuid);
  });

  it('try to delete a record with an invalid userId (400 error)', async () => {
    const response = await request(app).delete(`${URL.user_id}1111`);
    expect(response.status).toBe(STATUS_CODE.bad_request);
    expect(response.body.message).toBe(MESSAGE.invalid_uuid);
  });
});
