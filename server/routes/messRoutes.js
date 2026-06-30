import { Router } from 'express';
import { getMessDashboard, updateMessDashboard } from '../controllers/messController.js';

const router = Router();

router.get('/:id', getMessDashboard);
router.post('/:id', updateMessDashboard);

export default router;