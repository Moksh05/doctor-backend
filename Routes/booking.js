import express from "express";
import { changeStatus, scheduleBooking } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../Auth/verifyToken.js";
import { getMyAppointments } from "../Controllers/userController.js";

const router = express.Router({mergeParams:true})
router.route('/').get(getMyAppointments)
router.put('/:bookingId',authenticate, restrict(["doctor"]), changeStatus)
export default router