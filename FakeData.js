const UserList = [
  {
    id: 1,
    name: "John Doe",
    email: "john@mail.com",
    age: 25,
    nationality: "AMERICA",
    friends: [
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@mail.com",
        age: 23,
        nationality: "KENYA",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@mail.com",
    age: 23,
    nationality: "KENYA",
  },
];

const MovieList = [
  {
    id: 1,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
  },
];

module.exports = { UserList, MovieList };
