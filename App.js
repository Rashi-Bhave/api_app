const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const expressGraphQL = require('express-graphql').graphqlHTTP
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}



// Allow cross-origin

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()
app.use(cors(corsOptions))
const movies = [
    {
      id: 1,
      Name: "Slumdog millionaire",
      Duration: "2 hours",
      Description:
        "A teenager from the slums of Mumbai becomes a contestant on the show Kaun Banega Crorepati? When interrogated under suspicion of cheating, he revisits his past, revealing how he had all the answers.",
    },
    {
      id: 2,
      Name: "Life of Pi",
      Duration: "2h 7m",
      Description:
        "Pi Patel finds a way to survive in a lifeboat that is adrift in the middle of nowhere. His fight against the odds is heightened by the company of a hyena and a male Bengal tiger.",
    },
    {
      id: 3,
      Name: "The Shawshank Redemption",
      Duration: "2h 22m",
      Description:
        "Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
    },
    {
      id: 4,
      Name: "Lord Of The Rings Fellowship Of Ring",
      Duration: "2h 58m",
      Description:
        "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.",
    },
  ];

const cars = [
  {
    id:1,
    Company:'Mercedes',
    Name:'Benz C-Class',
    Price: '50 Lakhs',
    Type :'Petrol and Diesel'
  },
  {
    id:1,
    Company:'Mercedes',
    Name:'Benz S-Class',
    Price: '2.17 cr',
    Type :'Petrol and Diesel'
  },
  {
    id:1,
    Company:'BMW',
    Name:'3 series',
    Price: '43.58 lakh',
    Type :'Petrol and Diesel'
  },
  {
    id:1,
    Company:'BMW',
    Name:'X 6',
    Price: '96.90 lakhs',
    Type :'Petrol and Diesel'
  },
  {
    id:1,
    Company:'Audi',
    Name:'e-tron',
    Price: '1 cr',
    Type :'Electric'
  },
  {
    id:1,
    Company:'Audi',
    Name:'R8',
    Price: '2.30 cr',
    Type :'Petrol'
  },
]
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'This represents a movie',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    Name: { type: GraphQLNonNull(GraphQLString) },
    Duration: { type: GraphQLNonNull(GraphQLString) },
    Description: { type: GraphQLNonNull(GraphQLString) },
  })
})

const CarType = new GraphQLObjectType({
  name: 'Car',
  description: 'This represents a car',
  fields: () => ({
    id:{type: GraphQLNonNull(GraphQLInt) },
    Company:{ type: GraphQLNonNull(GraphQLString)},
    Name:{ type: GraphQLNonNull(GraphQLString) },
    Price: { type: GraphQLNonNull(GraphQLString) },
    Type :{ type: GraphQLNonNull(GraphQLString) }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    movie: {
      type: new GraphQLList(MovieType),
      description: 'A Single movie',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => movies.find(movie => movie.id === args.id)
    },
    movies: {
      type: new GraphQLList(MovieType),
      description: 'List of All movies',
      resolve: () => movies
    },
    car: {
      type: new GraphQLList(CarType),
      description: 'A Single movie',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => cars.find(car => car.id === args.id)
    },
    cars: {
      type: new GraphQLList(CarType),
      description: 'List of All movies',
      resolve: () => cars
    },
  })
})


const schema = new GraphQLSchema({
  query: RootQueryType,

})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))