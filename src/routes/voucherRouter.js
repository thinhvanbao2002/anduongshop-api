import express from "express";
import voucherController from "../controllers/voucherController.js";

const router = express.Router();

router.get('/get', voucherController.getVoucher);

router.get('/search', voucherController.searchVoucher);

router.get('/getbyid/:id', voucherController.getVoucherById);

router.post('/create', voucherController.createVoucher);

router.put('/update/:id', voucherController.updateVoucher);

router.delete('/delete/:id', voucherController.deleteVoucher);

export default router;
