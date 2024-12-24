import { Router } from 'express';
import { showNewSplitBillForm, createGroups, getGroup, deleteGroup } from '../../controller/groupController.js';
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/new',  showNewSplitBillForm);
router.get('/:id',  getGroup);

router.post('/new',  createGroups);
router.delete('/:groupId/delete' ,  deleteGroup)

export default router;
