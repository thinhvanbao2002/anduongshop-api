import Express from "express";
import adminController from "../controllers/adminController.js";

const router = Express.Router();

router.post('/login', adminController.login);

router.get('/get', adminController.getPersonnal);

router.get('/search', adminController.searchPersonnal);

router.post('/create', adminController.createPersonnal);

router.put('/update/:id', adminController.updatePersonnal);

router.delete('/delete/:id', adminController.deletePersonnal);


export default router;

