import { useState } from "react";

export default function JobSearch() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchJobs = async () => {
    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keywords, location }),
      });

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Enter key via form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    searchJobs();
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>Job Search</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Keywords (e.g. React Developer)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="text"
          placeholder="Location (e.g. Remote, New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        {/* Hidden submit button allows Enter key to work */}
        <button type="submit" style={{ display: "none" }} />
      </form>

      <button onClick={searchJobs} disabled={loading}>
        {loading ? "Searching..." : "Search Jobs"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ marginTop: 20 }}>
        {jobs.map((job, index) => (
          <li key={index} style={{ marginBottom: 15 }}>
            <h4>{job.title}</h4>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              View Job
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

