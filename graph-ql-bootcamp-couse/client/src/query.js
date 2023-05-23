import { gql } from '@apollo/client';

const query = gql`
  query {
    users {
      id
      name
      car {
        id
        make
        model
        color
      }
    }
  }
`;

export default query;
