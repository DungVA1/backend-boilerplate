import express from 'express';
import { tokenGenerator, tokenBreaker } from '../middleware/jwt';
import uuid from 'uuid';

const mockDataUser = [{ id: uuid(), userName: 'dung'} ];

const routerDefine =  function defineRouter() {
  const route = express.Router();

  route.get('/users', (req, res) => {
    res.status(200).json({
      data: mockDataUser,
    });
  });

  route.post('/users', (req, res) => {
    const { userName } = req.body;
    mockDataUser.push({
      id: uuid(),
      userName,
    });

    res.status(201).json({
      data: 'Created',
    });
  });

  route.post('/login', (req, res) => {
    const { userName } = req.body;
    const token = tokenGenerator(userName);

    res.status(200).json({
      token,
    });
  });

  route.post('/logout', (req, res) => {
    const { token } = req.body;
    tokenBreaker(token);

    res.status(200).json({
      logout: true,
    });
  });

  return route;
};

export default routerDefine;