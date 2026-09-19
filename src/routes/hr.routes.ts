import { Router } from 'express';
import { HRController } from '../controllers/hr.controller';
import { authenticate, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
// Ensure only HR or ADMIN can access HR metrics
router.use(requireRole(['HR', 'ADMIN']));

router.get('/metrics', HRController.getWorkforceMetrics);
router.get('/skill-distribution', HRController.getSkillDistribution);
router.get('/department-skills', HRController.getDepartmentSkills);
router.get('/emerging-skills', HRController.getEmergingSkills);
router.get('/skill-gaps', HRController.getSkillGaps);
router.get('/role-demand', HRController.getRoleDemand);
router.get('/talent-discovery', HRController.getTalentDiscovery);
router.get('/mobility-seekers', HRController.getMobilitySeekers);
router.get('/mobility-opportunities', HRController.getMobilityOpportunities);

export default router;
