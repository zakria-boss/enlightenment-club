'use client'

import { Role } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface RoleBasedAccessProps {
  allowedRoles: Role[]
  children: ReactNode
}

export default function RoleBasedAccess({ allowedRoles, children }: RoleBasedAccessProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || !session.user || !allowedRoles.includes(session.user.role as Role)) {
    return null
  }

  return <>{children}</>
}