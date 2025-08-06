import { SignedIn } from '@clerk/clerk-react'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
        <SignedIn>
            <div>Dashboard</div>
        </SignedIn>
    </div>
  )
}
