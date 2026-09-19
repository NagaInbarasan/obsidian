import { Router } from 'express';
import { LearningController } from '../controllers/learning.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { paginationSchema } from '../schemas/common.schema';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(paginationSchema), LearningController.getLearningResources);

export default router;
