import { useState } from "react";
import "../styles/reportIssue.css";
import LocationPicker from "../components/LocationPicker";
import {
    reportComplaint,
    supportComplaint
} from "../services/reportService";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    coordinates: null,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
const [duplicateFound, setDuplicateFound] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (file) {
        setFormData({
          ...formData,
          image: file,
        });

        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: location,
    }));
  };

  const removeImage = () => {
    setPreview(null);

    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const validate = () => {
    let temp = {};

    if (!formData.title.trim())
      temp.title = "Issue title is required.";

    if (!formData.description.trim())
      temp.description = "Description is required.";

    if (!formData.coordinates)
      temp.coordinates = "Please select a location on the map.";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

const handleSubmit = async (e) => {

    e.preventDefault();

    

    console.log("Submit clicked");

    if (!validate()) {
        console.log("Validation Failed");
        return;
    }

    console.log("Validation Passed");

    setLoading(true);

    try {

        const complaint = {

            title: formData.title,
            description: formData.description,
            location: formData.coordinates
                ? formData.coordinates.address
                : "",
            submitAnyway: false

        };

        const multipartData = new FormData();

        multipartData.append(
            "complaint",
            new Blob(
                [JSON.stringify(complaint)],
                { type: "application/json" }
            )
        );

        if (formData.image) {
            multipartData.append("image", formData.image);
        }

       let response = await reportComplaint(multipartData);

        console.log(response);
        if (response.data) {
            setAiResult(response.data);
        }

        if (!response.success &&
            response.message === "Similar complaint found") {
              setLoading(false);

              setAiResult(response.data);

              setDuplicateFound(response.data);

              return;

        }

        alert(response.message);

        setFormData({
            title: "",
            description: "",
            category: "",
            priority: "Medium",
            coordinates: null,
            image: null,
        });

        setPreview(null);
        setErrors({});

    } catch (error) {

    console.log(error);

    alert(
        error.response?.data?.message ||
        "Complaint submission failed."
    );

} finally {

        setLoading(false);

    }

};
const submitAnyway = async () => {

    try {

        const complaint = {

            title: formData.title,
            description: formData.description,
            location: formData.coordinates.address,
            submitAnyway: true

        };

        const retryData = new FormData();

        retryData.append(
            "complaint",
            new Blob(
                [JSON.stringify(complaint)],
                {
                    type:"application/json"
                }
            )
        );

        if(formData.image){

            retryData.append(
                "image",
                formData.image
            );

        }

        const response = await reportComplaint(retryData);

        alert(response.message);

        setDuplicateFound(null);

        setAiResult(null);

        setFormData({
            title:"",
            description:"",
            category:"",
            priority:"Medium",
            coordinates:null,
            image:null
        });

        setPreview(null);

    }

    catch(error){

        console.log(error);

    }

};
const handleSupportComplaint = async () => {

    try {
        console.log(duplicateFound);

        await supportComplaint(
            duplicateFound.matchedComplaint.id
        );

        alert(
            "Thank you for supporting the existing complaint!"
        );

        setDuplicateFound(null);
        setAiResult(null);

        setFormData({
            title:"",
            description:"",
            category:"",
            priority:"Medium",
            coordinates:null,
            image:null
        });

        setPreview(null);

    }

    catch(error){

        console.log(error);

        alert("Unable to support complaint.");

    }

};
  return (
    <div className="report-page">
      <div className="report-card">

        <h1>Report an Issue</h1>

        <p>
          Help improve your city by reporting civic issues.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Issue Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {errors.title && (
            <span className="error">{errors.title}</span>
          )}

          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
          




          <label>Select Location</label>

          <LocationPicker
            onLocationSelect={handleLocationSelect}
          />

          {errors.coordinates && (
            <span className="error">
              {errors.coordinates}
            </span>
          )}

          <label>Upload Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

          {preview && (
            <div className="preview-box">

              <img
                src={preview}
                alt="Preview"
              />

              <button
                type="button"
                className="remove-btn"
                onClick={removeImage}
              >
                Remove Image
              </button>

            </div>
          )}
{aiResult && (

<div className="ai-card">

    <h2>🤖 AI Analysis Complete</h2>

    <div className="ai-analysis-row">
        <span>📂 Predicted Category: </span>
        <strong>{aiResult.category}</strong>
    </div>

    <div className="ai-analysis-row">
        <span>⚡ Predicted Priority: </span>
        <strong>
            {aiResult.priority.charAt(0) +
            aiResult.priority.slice(1).toLowerCase()}
        </strong>
    </div>

    {aiResult.score > 0 && (

    <div className="ai-analysis-row">

        <span>🔍 Similarity Score</span>

        <strong>
            {(aiResult.score * 100).toFixed(0)}%
        </strong>

    </div>

    )}

    <div className="ai-recommendation">

        <h3>💡 AI Recommendation</h3>

        {duplicateFound ? (

            <p>
                A similar complaint already exists.
                Supporting the existing complaint will help
                authorities prioritize and resolve it faster.
            </p>

        ) : (

            <p>
                No similar complaint was found.
                Your complaint appears unique and is ready
                to be submitted.
            </p>

        )}

    </div>

</div>

)}
          {duplicateFound && (

<div className="duplicate-card">

    <h2>⚠️ Duplicate Complaint Detected</h2>

    <p>

        Our AI found a highly similar complaint already reported nearby.
Supporting the existing complaint helps authorities avoid duplicate records.

    </p>

<div className="duplicate-info">

    <p>

        <strong>Existing Complaint</strong>

    </p>

    <p>

        {duplicateFound.matchedComplaint.description}

    </p>

    <hr/>

    <p>

        <strong>Category:</strong>

        {duplicateFound.category}

    </p>

    <p>

        <strong>Priority:</strong>

        {duplicateFound.priority}

    </p>

    <p>

        <strong>Similarity:</strong>

        {(duplicateFound.score*100).toFixed(0)}%

    </p>

    <p>

    <strong>Recommended Action</strong>

    </p>

    <p>

  ✔ Support Existing Complaint
This increases its visibility and helps local authorities
prioritize the issue.

OR

Submit Anyway
Use this only if your complaint refers to a different issue.

    </p>

</div>

    <div className="duplicate-buttons">

        <button
            className="support-btn"
           onClick={handleSupportComplaint}
        >

            👍 Support Existing

        </button>

        <button
            className="submit-anyway-btn"
            onClick={submitAnyway}
        >

            📤 Submit Anyway

        </button>

    </div>

</div>

)}


          <button
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Complaint"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ReportIssue;