import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { paginationSchema, idParamSchema } from '../schemas/common.schema';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate); // Secure all employee routes

router.get('/', validateRequest(paginationSchema), EmployeeController.getEmployees);
router.get('/:id', validateRequest(idParamSchema), EmployeeController.getEmployeeById);
router.get('/:id/profile', validateRequest(idParamSchema), EmployeeController.getEmployeeProfile);
router.get('/:id/matches', validateRequest(idParamSchema), EmployeeController.getEmployeeMatches);

export default router;
