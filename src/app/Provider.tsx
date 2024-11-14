'use client'
import { db } from '@/configs/dbConnect'
import { Users } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'

function Provider({ children }: { children: React.ReactNode }) {
  console.log('Provider component is rendering') // Log when this component mounts

  const { user } = useUser() // Fetches user details from Clerk

  /*  useEffect(() => {
    // Whenever the application launches for the first time, it checks if the user is available, then calls isNewUser
    if (user) {
      console.log('User is available. Checking if new user...')
      isNewUser()
    }
  }, [user]) // This will update when user information is available
 */
  useEffect(() => {
    console.log('useEffect triggered') // Log to check if effect runs
    if (user) {
      console.log('User is available. Checking if new user...')
      isNewUser()
    } else {
      console.log('No user available.') // Log when no user is available
    }
  }, [user])

  // To check if the user is a new user from the database
  const isNewUser = async () => {
    console.log('isNewUser called') // Log when the function is called

    const result = await db
      .select()
      .from(Users) // Check if the user already exists in the Users table
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ''))

    console.log('Database result:', result) // Log the result from the database

    if (!result[0]) {
      // If the user is not in the database, insert user details in the db
      console.log('User not found in DB. Inserting user...') // Log when inserting user
      await db.insert(Users).values({
        name: user?.fullName ?? '',
        email: user?.primaryEmailAddress?.emailAddress ?? '',
        imageUrl: user?.imageUrl ?? '',
      })
      console.log('User inserted successfully.') // Log after successful insertion
    } else {
      console.log('User already exists in DB.') // Log if user already exists
    }
  }

  return <div>{children}</div>
}

export default Provider
