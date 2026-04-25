const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Models
const User = require('../models/User');
const Report = require('../models/Report');
const Medicine = require('../models/Medicine');
const Doctor = require('../models/Doctor');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Report.deleteMany({});
    await Medicine.deleteMany({});
    await Doctor.deleteMany({});
    console.log('Cleared existing data.');

    // Create users
    const users = await User.create([
      {
        name: 'Arshyan Khan',
        email: 'arshyan@example.com',
        password: 'password123',
        age: 24,
        gender: 'Male',
        phone: '+91 9876543210',
        bloodGroup: 'O+',
        allergies: ['Penicillin', 'Dust'],
        conditions: ['Mild Asthma'],
        address: 'Mumbai, India',
        emergencyContact: '+91 9876543211',
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'password123',
        age: 28,
        gender: 'Female',
        phone: '+91 9123456789',
        bloodGroup: 'A+',
        allergies: ['Sulfa Drugs'],
        conditions: [],
        address: 'Delhi, India',
        emergencyContact: '+91 9123456780',
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create reports for first user
    const reports = await Report.create([
      {
        userId: users[0]._id,
        title: 'Complete Blood Count (CBC)',
        doctor: 'Dr. Rajesh Patel',
        date: new Date('2026-04-15'),
        category: 'blood-test',
        summary: 'All values within normal range. Hemoglobin: 14.2 g/dL, WBC: 7,500/μL',
        status: 'normal',
      },
      {
        userId: users[0]._id,
        title: 'Chest X-Ray',
        doctor: 'Dr. Anita Desai',
        date: new Date('2026-04-10'),
        category: 'x-ray',
        summary: 'Clear lung fields. No abnormalities detected. Heart size normal.',
        status: 'normal',
      },
      {
        userId: users[0]._id,
        title: 'Lipid Profile',
        doctor: 'Dr. Rajesh Patel',
        date: new Date('2026-04-05'),
        category: 'blood-test',
        summary: 'LDL cholesterol slightly elevated at 145 mg/dL. Recommend dietary changes.',
        status: 'attention',
      },
      {
        userId: users[0]._id,
        title: 'ECG Report',
        doctor: 'Dr. Suresh Mehta',
        date: new Date('2026-03-28'),
        category: 'ecg',
        summary: 'Normal sinus rhythm. No ST-T wave changes. Normal intervals.',
        status: 'normal',
      },
      {
        userId: users[0]._id,
        title: 'Thyroid Function Test',
        doctor: 'Dr. Kavita Joshi',
        date: new Date('2026-03-20'),
        category: 'blood-test',
        summary: 'TSH: 3.2 mIU/L (Normal). T3 and T4 within normal limits.',
        status: 'normal',
      },
      {
        userId: users[0]._id,
        title: 'Urine Analysis',
        doctor: 'Dr. Rajesh Patel',
        date: new Date('2026-03-15'),
        category: 'urine-test',
        summary: 'Trace protein detected. Recommend follow-up in 3 months.',
        status: 'attention',
      },
    ]);

    console.log(`✅ Created ${reports.length} reports`);

    // Create medicines for first user
    const medicines = await Medicine.create([
      {
        userId: users[0]._id,
        name: 'Montelukast',
        dosage: '10mg',
        time: '22:00',
        frequency: 'daily',
        enabled: true,
        notes: 'Take before bedtime for asthma control',
      },
      {
        userId: users[0]._id,
        name: 'Cetirizine',
        dosage: '10mg',
        time: '09:00',
        frequency: 'daily',
        enabled: true,
        notes: 'Antihistamine for allergies',
      },
      {
        userId: users[0]._id,
        name: 'Vitamin D3',
        dosage: '60000 IU',
        time: '10:00',
        frequency: 'weekly',
        enabled: true,
        notes: 'Take with milk or fatty food',
      },
      {
        userId: users[0]._id,
        name: 'Omega-3 Fish Oil',
        dosage: '1000mg',
        time: '13:00',
        frequency: 'daily',
        enabled: true,
        notes: 'After lunch for cholesterol management',
      },
      {
        userId: users[0]._id,
        name: 'Salbutamol Inhaler',
        dosage: '2 puffs',
        time: '08:00',
        frequency: 'as-needed',
        enabled: false,
        notes: 'Use only during asthma flare-ups',
      },
      {
        userId: users[0]._id,
        name: 'Multivitamin',
        dosage: '1 tablet',
        time: '08:30',
        frequency: 'daily',
        enabled: true,
        notes: 'Take with breakfast',
      },
      {
        userId: users[0]._id,
        name: 'Pantoprazole',
        dosage: '40mg',
        time: '07:30',
        frequency: 'daily',
        enabled: true,
        notes: 'Take 30 minutes before breakfast on empty stomach',
      },
      {
        userId: users[0]._id,
        name: 'Melatonin',
        dosage: '3mg',
        time: '21:30',
        frequency: 'as-needed',
        enabled: false,
        notes: 'For occasional sleep support',
      },
    ]);

    console.log(`✅ Created ${medicines.length} medicines`);

    // Create doctors
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
      },
      {
        name: 'Dr. Kavita Joshi',
        specialization: 'Endocrinologist',
        rating: 4.6,
        phone: '+91 9876500004',
        hospital: 'Medanta Hospital',
        consultFee: 900,
        experience: 12,
        available: true,
        availableSlots: ['10:00 AM', '3:00 PM'],
      },
      {
        name: 'Dr. Arjun Singh',
        specialization: 'Dermatologist',
        rating: 4.5,
        phone: '+91 9876500005',
        hospital: 'AIIMS',
        consultFee: 600,
        experience: 10,
        available: true,
        availableSlots: ['11:00 AM', '2:00 PM', '5:00 PM'],
      },
      {
        name: 'Dr. Neha Gupta',
        specialization: 'Orthopedic Surgeon',
        rating: 4.8,
        phone: '+91 9876500006',
        hospital: 'Kokilaben Hospital',
        consultFee: 1500,
        experience: 22,
        available: true,
        availableSlots: ['9:00 AM', '12:00 PM'],
      },
      {
        name: 'Dr. Vikram Rao',
        specialization: 'Neurologist',
        rating: 4.9,
        phone: '+91 9876500007',
        hospital: 'Narayana Health',
        consultFee: 1100,
        experience: 16,
        available: false,
        availableSlots: [],
      },
      {
        name: 'Dr. Priya Nair',
        specialization: 'Ophthalmologist',
        rating: 4.4,
        phone: '+91 9876500008',
        hospital: 'Sankara Nethralaya',
        consultFee: 700,
        experience: 8,
        available: true,
        availableSlots: ['10:30 AM', '1:30 PM', '4:00 PM'],
      },
      {
        name: 'Dr. Amit Sharma',
        specialization: 'Psychiatrist',
        rating: 4.7,
        phone: '+91 9876500009',
        hospital: 'Nimhans',
        consultFee: 800,
        experience: 14,
        available: true,
        availableSlots: ['11:00 AM', '3:00 PM', '6:00 PM'],
      },
      {
        name: 'Dr. Meera Iyer',
        specialization: 'Gynecologist',
        rating: 4.8,
        phone: '+91 9876500010',
        hospital: 'Cloudnine Hospital',
        consultFee: 1000,
        experience: 19,
        available: true,
        availableSlots: ['9:00 AM', '11:30 AM', '2:30 PM'],
      },
    ]);

    console.log(`✅ Created ${doctors.length} doctors`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest credentials:');
    console.log('  Email: arshyan@example.com');
    console.log('  Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
