import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const SAVE_BOOK = gql`
    mutation saveBook($newBook: NewBook!) {
  saveBook(newBook: $newBook) {
    _id
    email
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    email
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;