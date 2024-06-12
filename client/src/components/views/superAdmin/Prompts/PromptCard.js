import React from 'react';
import { Form } from 'react-bootstrap'

const PromptCard = ({ title, description, placeholder, value, onChange , onSave,alertMessage, alertType }) => {
  return (
    <div className="col-12 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-description">{description}</p>
        <form className="forms-sample" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
          <Form.Group>
            <label htmlFor="exampleInputName1">{title}</label>
            <Form.Control
            contentEditable
            type="text"
            name="industryType"
            className="form-control"
            id="exampleInputName1"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            />
          </Form.Group>
          <button type="submit" className="btn-db me-2 px-4">
            Save
          </button>
        </form>
        {alertMessage && (
            <div className={`alert mt-3 ${alertType === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {alertMessage}
            </div>
          )}
      </div>
    </div>
  </div>
  )
}

export default PromptCard
