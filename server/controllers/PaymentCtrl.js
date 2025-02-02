const Payment = require('../models/Payment')
const Passenger = require('../models/passenger')
const Flights = require('../models/flight')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const payments = await Payment.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await Passenger.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "Passenger does not exist."})

            const {cart, paymentID, address} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payment({
                user_id: _id, name, email, cart, paymentID, address
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            
            await newPayment.save()
            res.json({msg: "Payment Succes!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Flights.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}
const disponible = async (id, Capacity,sold) =>{
    await Flights.findOneAndUpdate({_id: id}, {
        disponible: Capacity-sold
    })
}


    
    


module.exports = paymentCtrl