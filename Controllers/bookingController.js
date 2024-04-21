import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'


export const scheduleBooking = async (req,res,next) =>{
if(!req.body.doctor) req.body.doctor = req.params.doctorId    
if(!req.body.user) req.body.user = req.userId

const booking = await Booking.findOne({ user : req.body.user , appointmentDate : req.body.appointmentDate})

if(booking != null){
    res.status(200).json({succcess:true, message:"You already have a booking at this time", data: booking})
}else{
    const newbooking = new Booking(req.body)
    try{
        console.log(req.body.doctor)
        const savedBooking = await newbooking.save()
        //console.log(savedReview)
        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push:{appointments: savedBooking._id}
        })
        await User.findByIdAndUpdate(req.userId,{
            $push:{appointments: savedBooking._id}
        })
        res.status(200).json({succcess:true, message:"Booking Scheduled", data: savedBooking})
    }catch(e){
        console.log(e)
        //res.status(500).json({success:false, message: e})
    }
}

}

export const changeStatus = async (req, res, next) => {
    try {
        const bookingId = req.params.bookingId;
        const newStatus = req.body.status;

        
        const booking = findOne({_id :bookingId});

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = newStatus;

        return res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        
        return res.status(500).json({ message: 'Internal server error' });
    }
};



