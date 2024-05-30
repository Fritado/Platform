import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { promptData } from '../Prompts/PromptData'
import PromptCard from './PromptCard'
import { fetchPromptDetails, savePromptData } from '../../../services/PromptService/PromptService'

const Prompts = () => {
  const [promptCardsData, setPromptCardsData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promptDetailsResponse = await fetchPromptDetails()
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
  const handleSave = async () => {
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
      console.log('Prompt data saved successfully!')
    } catch (error) {
      console.error('Error while saving prompt data:', error)
    }
  }

  if (!promptCardsData) return null
  return (
    <div>
      <div className="page-header">
        <h2 className="text-dark fw-semibold mb-2"> Prompts </h2>
      </div>
      <div className="row">
        {promptCardsData.map((card, index) => (
          <PromptCard
            key={index}
            title={card.title}
            description={card.description}
            placeholder={card.placeholder}
            value={card.value}
            onChange={(event) => handleInputChange(index, event)}
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  )
}

export default Prompts
