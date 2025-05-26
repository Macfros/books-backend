import { Router } from 'express';
import * as AuthController from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { authSchema } from '../validators/auth.validator';

const router = Router();

router.post('/signup', validateRequest(authSchema), AuthController.signup);
router.post('/login', validateRequest(authSchema), AuthController.login);


export default router;
