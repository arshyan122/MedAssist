const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Doctor = require('./models/Doctor');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding doctors...');

    // Optionally clear existing doctors
    await Doctor.deleteMany({});

    const doctors = await Doctor.create([
      {
        name: 'Dr. Rajesh Patel',
        specialization: 'General Physician',
        rating: 4.8,
        phone: '+91 9876500001',
        hospital: 'Apollo Hospital',
        consultFee: 500,
        experience: 15,
        available: true,
        availableSlots: ['9:00 AM', '11:00 AM', '3:00 PM', '5:00 PM'],
        image: 'https://images.unsplash.com/photo-1612349317150-e410f624c427?q=80&w=250&auto=format&fit=crop'
      },
      {
        name: 'Dr. Anita Desai',
        specialization: 'Pulmonologist',
        rating: 4.9,
        phone: '+91 9876500002',
        hospital: 'Fortis Healthcare',
        consultFee: 800,
        experience: 20,
        available: true,
        availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
        image: 'https://images.unsplash.com/photo-1594824436998-d50d0322c366?q=80&w=250&auto=format&fit=crop'
      },
      {
        name: 'Dr. Suresh Mehta',
        specialization: 'Cardiologist',
        rating: 4.7,
        phone: '+91 9876500003',
        hospital: 'Max Super Speciality',
        consultFee: 1200,
        experience: 18,
        available: true,
        availableSlots: ['9:30 AM', '1:00 PM', '4:30 PM'],
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop'
      }
    ]);

    console.log(`✅ Created ${doctors.length} doctors with images`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDoctors();
