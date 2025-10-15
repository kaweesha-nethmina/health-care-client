"use client"

import { useState } from "react"
import { ApiClient } from "@/lib/api"

export default function ApiTestPage() {
  const [testResult, setTestResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testApiConnection = async () => {
    setLoading(true)
    setTestResult("Testing API connection...")
    
    try {
      // Test a simple endpoint (this will likely fail without auth, but we can see if the connection works)
      const response = await ApiClient.get("/auth/login")
      setTestResult(`API Connection successful: ${JSON.stringify(response)}`)
    } catch (error: any) {
      // We expect this to fail since we're not providing credentials, but we can see if the connection works
      if (error.message.includes("Failed to fetch")) {
        setTestResult("Error: Could not connect to API. Please ensure the backend is running on http://localhost:5000")
      } else {
        setTestResult(`API Connection working. Authentication required: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">API Integration Test</h1>
      <button 
        onClick={testApiConnection} 
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test API Connection"}
      </button>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Test Result:</h2>
        <p className="whitespace-pre-wrap">{testResult}</p>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold mb-2">Next Steps:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure your backend is running on port 5000</li>
          <li>Test the login functionality at <a href="/login" className="text-blue-600 hover:underline">/login</a></li>
          <li>Test the registration functionality at <a href="/register" className="text-blue-600 hover:underline">/register</a></li>
        </ul>
      </div>
    </div>
  )
}