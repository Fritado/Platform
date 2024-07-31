import React, {useState} from 'react'

const analyticsInfo = () => {
  const [propertyId, setPropertyId] = useState('')
  const [analyticsData, setAnalyticsData] = useState(null)

  const handleFetchData = async () => {
    console.log("Analytics Info")
    const response = await fetch('/fetchAnalyticsData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ propertyId }),
    })

    const data = await response.json()
    setAnalyticsData(data)
  }

  return (
    <div>
      <h1>Google Analytics Information</h1>
      <p>Email: {/* Display user email here */}</p>
      <input
        type="text"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        placeholder="Enter Property ID"
      />
      <button onClick={handleFetchData}>Fetch Data</button>
      {analyticsData && (
        <div>
          <h2>Analytics Data</h2>
          <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default analyticsInfo
