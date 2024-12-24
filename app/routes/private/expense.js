import { Router } from 'express';
import { addExpenses, deleteExpense, editExpensePage, updateExpense } from "../../controller/expenseController.js"
import { verifyToken } from '../../middleware/authMiddleware.js';

const router = Router();
//split/expense/...
router.get('/:groupId/expense/:expenseId/edit',  editExpensePage);
router.post('/:groupId/expense',  addExpenses);
router.put('/:groupId/expense/:expenseId/edit', updateExpense);
router.delete('/:groupId/expense/:expenseId/delete', deleteExpense);

export default router;
