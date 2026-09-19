import { Router } from 'express';
import { SkillController } from '../controllers/skill.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { paginationSchema } from '../schemas/common.schema';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(paginationSchema), SkillController.getSkills);

export default router;
