import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
const Home = () => {
    const loggedIn = {firstName:'Revanth' , lastName:'Bojja' , email:'revanthbojja@gmail.com'}
  return (
    <section className="home">
        <div className="home-content">
            <header className="home-header">
            <HeaderBox type="greeting" title="Welcome" user={loggedIn.firstName || 'Guest'}
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