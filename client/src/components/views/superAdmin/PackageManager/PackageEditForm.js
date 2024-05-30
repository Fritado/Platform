import React, { useEffect, useState } from 'react'
import { packageUpdate } from '../../../services/Subscription/PackageManagerService'

const PackageEditForm = ({ onCloseModal, initialPackage }) => {
  const [packageName, setPackageName] = useState(initialPackage ? initialPackage.packageName : '')
  const [packagePrice, setPackagePrice] = useState(
    initialPackage ? initialPackage.packagePrice : '',
  )
  const [validity, setValidity] = useState(initialPackage ? initialPackage.validity : '')
  const [blogPost, setBlogPost] = useState(initialPackage ? initialPackage.blogPost : '')

  const [validityUnit, setValidityUnit] = useState(
    initialPackage && initialPackage.validity ? initialPackage.validity.split(' ')[1] : 'Days',
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (initialPackage) {
      setPackageName(initialPackage.packageName)
      setPackagePrice(initialPackage.packagePrice)
      // Handle undefined validity
      if (initialPackage.validity) {
        const [value, unit] = initialPackage.validity.split(' ')
        setValidity(value)
        setValidityUnit(unit)
      }
      setBlogPost(initialPackage.blogPost)
    }
  }, [initialPackage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    const requestBody = {
      packageName,
      packagePrice,
      validity: `${validity} ${validityUnit}`,
      blogPost,
    }
    try {
      const packageId = initialPackage.packageId
      const response = await packageUpdate(packageId, requestBody)
      setSuccess('Package created successfully!')
      onCloseModal()
    } catch (error) {
      setError('Error while saving package. Please try again.')
      console.error('Error while saving package:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Edit Package</h5>
        <button type="button" className="btn-close" onClick={onCloseModal}></button>
      </div>
      <div className="modal-body">
        <form className="p-3" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="packageName" className="form-label">
                Package name *
              </label>
              <input
                contentEditable
                type="text"
                className="form-control"
                id="packageName"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="packagePrice" className="form-label">
                Price - USD *
              </label>
              <input
                contentEditable
                type="text"
                className="form-control"
                id="packagePrice"
                value={packagePrice}
                onChange={(e) => setPackagePrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <div className="col">
              <label htmlFor="validity" className="form-label">
                Validity *
              </label>
              <input
                contentEditable
                type="text"
                className="form-control"
                id="validity"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <div className="" style={{ marginTop: '3.5rem' }}>
                <select
                  className="form-control"
                  id="validityUnit"
                  value={validityUnit}
                  onChange={(e) => setValidityUnit(e.target.value)}
                  required
                >
                  <option value="Days">Days</option>
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3 align-items-center">
            <div className="col">
              <label htmlFor="blogPost" className="form-label">
                Number of blog post per month *
              </label>
              <input
                contentEditable
                type="text"
                className="form-control"
                id="blogPost"
                value={blogPost}
                onChange={(e) => setBlogPost(e.target.value)}
                required
              />
            </div>
            <div className="col"></div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default PackageEditForm
