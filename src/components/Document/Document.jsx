import React, { useState, useContext } from 'react';
import { FileContext } from '../FileContext/FileContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Document.css';

const Document = () => {
  const { addFiles } = useContext(FileContext); // Add files function from context
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [department, setDepartment] = useState(''); // ตั้งค่าเริ่มต้นให้เป็นค่าแรกใน dropdown
  const [date, setDate] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [activeTab, setActiveTab] = useState('Upload'); // Active tab state
  const [uploadedFile, setUploadedFile] = useState(null); // Store uploaded file details for preview

  const navigate = useNavigate(); // Create navigate function using useNavigate

  const steps = ['Upload', 'Preview'];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    if (!isNaN(inputDate)) {
      setDate(e.target.value); // เก็บค่า ISO format สำหรับการจัดการในแอป
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!file || !name || !type || !department || !date || !uploadedBy) {
      alert('All fields are required!');
      return;

    }

    const newFile = {
      id: Date.now(), // Generate unique ID
      name,
      type,
      department,
      date,
      time: new Date().toLocaleTimeString(),
      FileUrl: URL.createObjectURL(file),
      uploadedBy,
    };

    setUploadedFile(newFile); // Store file details for preview
    addFiles(newFile); // Add file to context
    setActiveTab('Preview'); // Automatically switch to Preview tab
  };

  return (
    <div className="step-tabs-container">
      {/* Tabs */}
      <div className="tabs">
        {steps.map((step) => (
          <button
            key={step}
            className={`tab-button ${activeTab === step ? 'active' : ''}`}
            onClick={() => setActiveTab(step)}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'Upload' && (
          <div>
            <h3>Upload Document</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>ชื่อเอกสาร</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>ประเภทเอกสาร</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">เลือกประเภทเอกสาร</option>
                  <option value="ผลการดำเนินงาน">ผลการดำเนินงาน</option>
                  <option value="รายงานประจำปี">รายงานประจำปี</option>
                  <option value="รายงานปริมาณการผลิตรายเดือน">
                    รายงานปริมาณการผลิตรายเดือน
                  </option>
                  <option value="การขาย มูลค่า และค่าภาคหลวง">
                    การขาย มูลค่า และค่าภาคหลวง
                  </option>
                  <option value="การจัดสรรค่าภาคหลวงให้ท้องถิ่น">
                    การจัดสรรค่าภาคหลวงให้ท้องถิ่น
                  </option>
                  <option value="การจัดหาปิโตรเลียม">การจัดหาปิโตรเลียม</option>
                  <option value="ปริมาณสำรองปิโตรเลียม">
                    ปริมาณสำรองปิโตรเลียม
                  </option>
                </select>
              </div>
              <span className="form-group-horizontal">
                <div className="form-item">
                  <label>หน่วยงาน</label>
                  <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  >
                    <option value="">เลือกหน่วยงาน</option>
                    <option value="กรมเชื้อเพลิงธรรมชาติ">กรมเชื้อเพลิงธรรมชาติ</option>
                  </select>
                </div>

                <div className="form-item">
                  <label className="date">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                  />
                </div>
              </span>
              <div>
                <label>ชื่อผู้บันทึก</label>
                <input
                  type="text"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>File Upload</label>
                <input type="file" onChange={handleFileChange} required />
              </div>
              <button type="submit" className="continue-button">
                {uploadedFile ? 'Continue to Preview' : 'Upload Document'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'Preview' && (
          <div>
            <h3>Preview Document</h3>
            {uploadedFile ? (
              <div>
                {/* Show uploaded file preview */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4>File Preview:</h4>
                  {uploadedFile.FileUrl && (
                    <div style={{ marginTop: '1rem' }}>
                      {uploadedFile.FileUrl?.type?.startsWith('image/') ? (
                        <img
                          src={uploadedFile.FileUrl}
                          alt={uploadedFile.name}
                          style={{ maxWidth: '100%', maxHeight: '300px' }}
                        />
                      ) : (
                        <iframe
                          src={uploadedFile.FileUrl}
                          title={uploadedFile.name}
                          style={{ width: '100%', height: '500px', border: 'none' }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Show document details */}
                <p><strong>Document Name:</strong> {uploadedFile.name}</p>
                <p><strong>Document Type:</strong> {uploadedFile.type}</p>
                <p><strong>Department:</strong> {uploadedFile.department}</p>

                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(uploadedFile.date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p><strong>Uploaded By:</strong> {uploadedFile.uploadedBy}</p>
                <p><strong>Uploaded Time:</strong> {uploadedFile.time}</p>
                <button className='continue-button' onClick={() => navigate("/")}>
                  อัพโหลด
                </button>
              </div>
            ) : (
              <p>No document uploaded yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
