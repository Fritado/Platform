import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { promptData } from '../Prompts/PromptData'
import PromptCard from './PromptCard'
import { fetchPromptDetails, savePromptData } from '../../../services/PromptService/PromptService'

const Prompts = () => {
  const [promptCardsData, setPromptCardsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saveStatus, setSaveStatus] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promptDetailsResponse = await fetchPromptDetails()
        if (!promptDetailsResponse || promptDetailsResponse.length === 0) {
          // Set promptCardsData to empty values if no data is returned
          setPromptCardsData(
            promptData.map((prompt) => ({
              ...prompt,
              value: '', // Initialize with empty values
            })),
          )
          return
        }
        const fetchedPromptDetails = promptDetailsResponse[0]
        // console.log('promptDetails', fetchedPromptDetails);
        const titleToKeyMap = {
          'Business Details': 'BusinessDetails',
          Keyword: 'Keyword',
          'Product And Service': 'ProductAndService',
          Location: 'Location',
          'Blog Topic': 'BlogTopic',
          'Blog Description': 'BlogDescription',
        }
        const cleanedFetchedPromptDetails = Object.fromEntries(
          Object.entries(fetchedPromptDetails).map(([key, value]) => [key.trim(), value]),
        )

        const mergedPromptData = promptData.map((prompt) => ({
          ...prompt,
          value: cleanedFetchedPromptDetails[titleToKeyMap[prompt.title]] || prompt.placeholder,
        }))

        setPromptCardsData(mergedPromptData)
      } catch (error) {
        console.error('Error while fetching prompt details:', error)
      }
    }
    fetchData()
  }, [])
  const handleInputChange = (index, event) => {
    const { value } = event.target
    const updatedData = [...promptCardsData]
    updatedData[index].value = value
    setPromptCardsData(updatedData)
  }
  const handleSave = async (index) => {
    setLoading(true)

    try {
      const requestBody = {
        BusinessDetails: promptCardsData[0].value,
        Keyword: promptCardsData[1].value,
        ProductAndService: promptCardsData[2].value,
        Location: promptCardsData[3].value,
        BlogTopic: promptCardsData[4].value,
        BlogDescription: promptCardsData[5].value,
      }

      await savePromptData(requestBody)
      const updatedData = [...promptCardsData]
      updatedData[index].alertMessage = 'Prompt data saved successfully!'
      updatedData[index].alertType = 'success'
      setPromptCardsData(updatedData)
      setTimeout(() => {
        const resetData = [...promptCardsData]
        resetData[index].alertMessage = ''
        resetData[index].alertType = ''
        setPromptCardsData(resetData)
      }, 3000)
    } catch (error) {
      const updatedData = [...promptCardsData]
      updatedData[index].alertMessage = 'Error while saving prompt data. Please try again.'
      updatedData[index].alertType = 'danger'
      setPromptCardsData(updatedData)
      setTimeout(() => {
        const resetData = [...promptCardsData]
        resetData[index].alertMessage = ''
        resetData[index].alertType = ''
        setPromptCardsData(resetData)
      }, 3000)

      console.error('Error while saving prompt data:', error)
    } finally {
      setLoading(false)
    }
  }
 // console.log('Render Success:', success)
  //if (!promptCardsData) return null
  return (
    <div>
      <div className="page-header">
        <h2 className="text-dark fw-semibold mb-2"> Prompts </h2>
      </div>
      
      <div className="row">
        {promptCardsData.map((card, index) => (
          <div key={index} className="col-12 mb-3">
            <PromptCard
              key={index}
              title={card.title}
              description={card.description}
              placeholder={card.placeholder}
              value={card.value}
              alertMessage={card.alertMessage}
              alertType={card.alertType}
              onChange={(event) => handleInputChange(index, event)}
              onSave={() => handleSave(index)}
            />
          </div>
        ))}
      </div>
      {loading && <div className="alert alert-info">Saving prompt data...</div>}
    </div>
  )
}

export default Prompts
