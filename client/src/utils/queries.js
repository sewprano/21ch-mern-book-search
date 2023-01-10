import {gql} from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            email
            username
            descrition
            savedBooks {
                authors
                descrition
                bookId
                image
                link
                title
            }
        }
    }
`