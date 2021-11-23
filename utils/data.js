import bcrypt from 'bcrypt';
const salt = 10;

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
      isAdmin: false,
    },
  ],
  programmes: [
    {
      name: "Java",
      slug: "java",
      description:
        "Java programmes are focused on making learning fun and interactive. Join us today!",
      start: "02 Jan 2022",
      end: "02 March 2022",
      image: "/images/image1.jpg",
      price: 145,
      seatsAvailable: 12,
    },
    {
      name: "Python",
      slug: "python",
      description:
        "Interested in AI or machine learning? Our programmes will help you to develop the skills in Python!",
      start: "12 Feb 2022",
      end: "12 April 2022",
      image: "/images/image2.jpg",
      price: 145,
      seatsAvailable: 12,
    },
    {
      name: "JavaScript",
      slug: "jasvascript",
      description: "Learn your foundational knowledge of JavaScript here!",
      start: "22 March 2022",
      end: "22 May 2022",
      image: "/images/image3.jpg",
      price: 145,
      seatsAvailable: 12,
    },
    {
      name: "C++",
      slug: "cplusplus",
      description:
        "C++ is praised by developers for its versatility and a high-performance speed. Discover your love for programming today!",
      start: "22 May 2022",
      end: "22 July 2022",
      image: "/images/image4.jpg",
      price: 145,
      seatsAvailable: 12,
    },
    {
      name: "C",
      slug: "c",
      description:
        "C is syntactically similar to C++ - that’s why software developers often learn this language as well. Learn it today!",
      start: "22 September 2022",
      end: "22 October 2022",
      image: "/images/image5.jpg",
      price: 145,
      seatsAvailable: 12,
    },
    {
      name: "PHP",
      slug: "php",
      description:
        "PHP supports the back-end of 24% of all global websites — the highest market share among rival languages. Learn it today!",
      start: "22 November 2022",
      end: "22 December 2022",
      image: "/images/image6.jpg",
      price: 145,
      seatsAvailable: 12,
    },
  ],
};

export default data;
