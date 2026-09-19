import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { paginationSchema, idParamSchema } from '../schemas/common.schema';
import { authenticate, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', validateRequest(paginationSchema), RoleController.getRoles);
router.get('/:id', validateRequest(idParamSchema), RoleController.getRoleById);

// Only HR and ADMIN may see which employees are matched to a role (finding Z4)
router.get(
  '/:id/matches',
  validateRequest(idParamSchema),
  requireRole(['HR', 'ADMIN']),
  RoleController.getRoleMatches
);

export default router;
