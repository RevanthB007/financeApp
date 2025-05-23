import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'
const Home = async () => {
    const loggedIn = await getLoggedInUser()
    console.log(loggedIn)
    // const loggedIn = {name:'Revanth',email:'revanthbojja12@gmail.com'}
  return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
            <HeaderBox type="greeting" title="Welcome" user={loggedIn?.name}
            subtext="Access and manage ur acc and transactions effortlessly" />

            <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1230.5} />
            </header>
            Recent transactions
        </div>
        <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:999.99},{}]}
        />
    </section>
  )
}

export default Home