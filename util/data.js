import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'John',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'Jane',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    programmes: [
        {
            name: 'Java',
            slug: 'java',
            description: 'Learn Java',
            start: '02 Jan 2022',
            end: '02 March 2022',
            image: '/images/image1.jpg',
            price: 145,
            seatsAvailable: 12,
        },
        {
            name: 'Python',
            slug: 'python',
            description: 'Learn Python',
            start: '12 Feb 2022',
            end: '12 April 2022',
            image: '/images/image2.jpg',
            price: 145,
            seatsAvailable: 12,
        },
        {
            name: 'JavaScript',
            slug: 'jasvascript',
            description: 'Learn Java',
            start: '22 March 2022',
            end: '22 May 2022',
            image: '/images/image3.jpg',
            price: 145,
            seatsAvailable: 12,
        },
    ],
};

export default data;