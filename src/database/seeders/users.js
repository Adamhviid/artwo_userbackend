import User from '../../models/user.js';

const testUsers = [
    {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        isAdmin: '0'
    },
    {
        username: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        password: 'password456',
        isAdmin: '1'
    }
];

const seedUsers = async () => {
    try {
        console.log('Seeding users...');
        for (const user of testUsers) {
            await User.create(user);
        }
    } catch (err) {
        console.error(err);
    }
};

seedUsers();
