import express from 'express';

import * as abciAppAsApi from '../main/as';
import validate from './validator';

const router = express.Router();

router.get('/callback', async (req, res, next) => {
  try {
    const url = abciAppAsApi.getCallbackUrl();

    res.status(200).send({ url });
  } catch (error) {
    res.status(500).end();
  }
});

router.post('/callback', async (req, res, next) => {
  try {
    const validationResult = validate({
      method: req.method,
      path: `${req.baseUrl}${req.route.path}`,
      body: req.body,
    });
    if (!validationResult.valid) {
      res.status(400).send(validationResult);
      return;
    }

    const { url } = req.body;

    abciAppAsApi.setCallbackUrl(url);

    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

router.post('/service/:service_id', async (req, res, next) => {
  try {
    const validationResult = validate({
      method: req.method,
      path: `${req.baseUrl}${req.route.path}`,
      body: req.body,
    });
    if (!validationResult.valid) {
      res.status(400).send(validationResult);
      return;
    }
    
    const { service_id, service_name, min_ial, min_aal, url } = req.body;

    // Not Implemented
    // TODO

    res.status(501).end();
  } catch (error) {
    res.status(500).end();
  }
});

router.get('/service/:service_id', async (req, res, next) => {
  try {
    const { service_id } = req.params;

    // Not Implemented
    // TODO

    res.status(501).end();
  } catch (error) {
    res.status(500).end();
  }
});

export default router;
