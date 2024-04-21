import express from "express";
import { changeStatus, scheduleBooking } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../Auth/verifyToken.js";
import { getMyAppointments } from "../Controllers/userController.js";

const router = express.Router({mergeParams:true})
router.route('/').get(getMyAppointments)
export default router