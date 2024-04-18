import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'


export const scheduleBooking = async (req,res,next) =>{
if(!req.body.doctor) req.body.doctor = req.params.doctorId    
if(!req.body.user) req.body.user = req.userId

const booking = await Booking.findOne({ user : req.body.user , appointmentDate : req.body.appointmentDate})

if(booking != null){
    res.status(200).json({succcess:true, message:"You already have a booking at this time", data: booking})
}
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
    res.status(500).json({success:false, message: e})
}
}


export const getMyAppointments = async(req,res)=>{
    try{
    const bookings = await Booking.find({user:req.userId})

    // const doctorIds = bookings.map(el=>el.doctor.id)

    //const doctors = await Doctor.find({_id: {$in:doctorIds}}.select('~password'))
    res.status(200).json({success:true,message:'Appointments are getting',data:doctors})
    }catch(err){
        res.status(500).json({success:false, message:'Something went wrong'})
    }
}