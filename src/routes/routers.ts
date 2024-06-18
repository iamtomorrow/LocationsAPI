
import { Router, Request, Response } from 'express'
import { LocationController } from '../controllers/LocationController';
import express from 'express'

export const router = Router();

router.get('/ping', ( req: Request, res: Response ) => {
    res.json({ pong: "Pong" });
});

router.get('/location', express.query({ allowDots: true,  }), LocationController.getLocation)

