import User from '../../models/user.js';

User
    .sync()
    .then(() => {
        console.log('user table created');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

const testUsers = [
    {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        dateOfBirth: '1990-01-01',
        password: '$2b$10$ipw.8tiGNKCdWdAV0DtWI.LKKQqKOQ0rIIxI15OLONzufyb7bP2lC', //123
        isAdmin: '0'
    },
    {
        username: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        dateOfBirth: '1990-01-01',
        password: '$2b$10$ipw.8tiGNKCdWdAV0DtWI.LKKQqKOQ0rIIxI15OLONzufyb7bP2lC', //123
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
