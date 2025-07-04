"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SuspenseWrapper from "@/components/providers/suspense-wrapper"
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <SuspenseWrapper>
      <NotFoundContent />
    </SuspenseWrapper>
  )
}

function NotFoundContent() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl text-gray-900 dark:text-white mb-8">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#192e42] rounded-lg hover:bg-[#1a3249] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
} 