// src/config/server.ts
import express, { Express } from 'express';

export const setupServer = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Add other middleware as needed
};
