import express from 'express';
import { tokenGenerator, tokenBreaker } from '../middleware/jwt';
import uuid from 'uuid';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import User from '../../model/User';

const user = new User();

const routerDefine =  function defineRouter() {
  const route = express.Router();

  route.get('/users', (req, res) => {
    res.status(200).json({
      data: user.getUsers(),
    });
  });

  route.put('/users/:userId', (req, res) => {
    const { userName } = req.body;
    const { userId } = req.params;
    user.editUser({
      userName,
      userId,
    }, userId);

    res.status(200).json({
      data: 'Updated',
    });
  });

  route.post('/users', (req, res) => {
    const { userName } = req.body;

    user.addUser({
      id: uuid(),
      userName,
    });

    res.status(201).json({
      data: 'Created',
    });
  });

  route.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    res.status(200).json({
      data: user.getUser(userId),
    });
  });

  route.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    user.deleteUser(userId);
    res.status(200).json({ data: 'Deleted' });
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

  route.get('/upload', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(path.resolve(`${__dirname}/../public/index.html`));
  });

  const uploader = multer({ dest: '../public/files' });

  route.post('/upload', uploader.single('fileToUpload'), (req, res) => {
    const file = path.resolve(__dirname, `../public/files/${req.file.filename}`);
    fs.rename(req.file.path, `${file}.${req.file.originalname.split('.').pop()}`, (err) => {
      if (err) res.send(500);
      else res.send('OK');
    });
  });

  return route;
};

export default routerDefine;