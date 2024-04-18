import express from "express";
import { scheduleBooking } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../Auth/verifyToken.js";
import { getMyAppointments } from "../Controllers/userController.js";

const router = express.Router({mergeParams:true})
router.route('/').get(getMyAppointments).post(authenticate,restrict(['patient']),scheduleBooking)
export default router