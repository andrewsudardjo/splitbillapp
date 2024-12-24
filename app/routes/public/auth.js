import { Router } from 'express';
import { registerUser, loginPage,loginUser } from '../../controller/authController.js';

const router = Router();

router.post('/login',loginUser)
router.post('/register', registerUser);
router.get('/loginPage', loginPage);



export default router;
