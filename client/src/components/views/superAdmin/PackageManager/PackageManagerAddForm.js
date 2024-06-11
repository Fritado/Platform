import React, {useState} from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { MdEditDocument } from 'react-icons/md'
import { FaRegIdCard, FaKey } from 'react-icons/fa'
import { AiFillSave } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { VscDebugBreakpointUnsupported } from 'react-icons/vsc'
import { BlogModule } from '../../data/SuperAdminData/AdminBlogModule'
import { savePackage } from '../../../services/Subscription/PackageManagerService';

const PackageManagerAddForm = () => {
  const [packageName, setPackageName] = useState('')
  const [packagePrice, setPackagePrice] = useState('')
  const [validity, setValidity] = useState('')
  const [validityUnit, setValidityUnit] = useState('Days')
  const [blogPost, setBlogPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const title = {
    icon: <IoMdAddCircle size={34} color="" />,
    text: 'Add Package',
  }
  const ModuleHeader = ['#', '', 'Module', 'Usage limit', 'Mode']

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
      const response = await savePackage(requestBody);
     // console.log(response , "res");
      setSuccess('Package created successfully!')

      setPackageName('')
      setPackagePrice('')
      setValidity('')
      setValidityUnit('Days')
      setBlogPost('')
    } catch (error) {
      setError('Error while saving package. Please try again.')
      console.error('Error while saving package:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="container mx-auto">
      <section className="container">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center mb-4">
            {title.icon}
            <h1 className="text-dark fw-normal ps-3 mb-0">{title.text}</h1>
          </div>

          {/* Form */}
          <div className="my-3 bg-white">
            <form className="p-3" onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="packageName" className="form-label">
                    Package name *
                  </label>
                  <input
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
              <div className="d-grid gap-2 d-md-flex justify-content-end">
                <button className="border-0 rounded px-4 py-3" onClick="">
                  <AiFillSave size={20} />
                  Save
                </button>
                <button
                  className="border-0 rounded px-4 py-3"
                  onClick={() => {
                    setPackageName('')
                    setPackagePrice('')
                    setValidity('')
                    setValidityUnit('Days')
                    setBlogPost('')
                  }}
                >
                  <RxCross2 size={20} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
          {/* <div className="table-responsive">
            <table className="table border rounded table-bordered my-3 text-center">
              <thead>
                <tr>
                  {ModuleHeader.map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BlogModule.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{item.module}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        {item.blogsLimit}
                        <input
                          type="number"
                          value={item.usage}
                          min="0"
                          className="form-control"
                          style={{ width: '70px', display: 'inline-block' }}
                        />
                      </div>
                    </td>
                    <td>{item.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </section>
    </div>
  )
}

export default PackageManagerAddForm
