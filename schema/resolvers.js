const { UserList } = require("../FakeData");
const { MovieList } = require("../FakeData");
const _ = require("lodash");
const resolvers = {
  Query: {
    // users resolvers
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    // movies resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const title = args.title;
      const movie = _.find(MovieList, { title: title });
      return movie;
    },
  },
  //   users custom resolvers
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.rating > 8);
    },
  },
};

module.exports = { resolvers };
