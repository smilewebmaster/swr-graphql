import Link from 'next/link'
import subscribe from '../libs/subscribe'

import useSWR from 'swr'

const USER_SUBSCRIPTION = `
  subscription Users {
    users {
      id
      name
    }
  }
`;

const subscribeData = async(...args) => {
  return subscribe(USER_SUBSCRIPTION);
};

export default function Subscription() {
  const { data } = useSWR('subscription', subscribeData);
  if(!data) {
    return <div>Loading...</div>
  }

  return ( 
    <div style={{ textAlign: 'center' }}>
      <h1>Subscribed to Latest 10 users from the database</h1>
      <div>
      {
        data.users.map(user => 
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        )
      }
      </div>
    </div>
  )
}
