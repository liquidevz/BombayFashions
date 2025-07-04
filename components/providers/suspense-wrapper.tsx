import { Suspense } from 'react'

interface SuspenseWrapperProps {
  children: React.ReactNode
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#192e42]"></div>
    </div>
  )
}

export default function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  )
} 