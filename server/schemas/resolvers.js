const { AuthenticationError, UserInputError } = require('apollo-server-express');
const {User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('Please log in');
        },
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            try {
                const user = await User.findOne({email});
                
                if (!user) {
                    throw new AuthenticationError('No user with that email found');
                }
                
                const correctPw = await user.isCorrectPassword(password);
                
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect password!');
                }

                const token = signToken(user);

                return {token, user};

            } catch (error) {
                console.error(error);
            }
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            if (!user) {
                throw new UserInputError ('Something went wrong!');
            }
            const token = signToken(user);
            return {token, user};
        },

        saveBook: async (parent, {newBook}, context) => {
            try {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: newBook} },
                    { new: true, runValidators: true }
                  );
            } catch (error) {
                console.error(error);
            }
        },

        removeBook: async (parent, {bookId}, context) => {
            try {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                  );
            } catch (error) {
                console.error(error);
            }
        }
    },
};

module.exports = resolvers;
