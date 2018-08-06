import express from 'express';
import { tokenGenerator, tokenBreaker } from '../middleware/jwt';
import uuid from 'uuid';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

const mockDataUser = [{ id: uuid(), userName: 'dung' }];

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