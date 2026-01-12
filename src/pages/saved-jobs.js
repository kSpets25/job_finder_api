import { useEffect, useState } from "react";
import { getSavedJobs, removeJob } from "../utils/savedJobs";
import Link from "next/link";

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(getSavedJobs());
  }, []);

  const handleRemove = (id) => {
    removeJob(id);
    setJobs(getSavedJobs());
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>Saved Jobs</h2>

      <Link href="/">← Back to Search</Link>

      {jobs.length === 0 && <p>No saved jobs yet.</p>}

      <ul style={{ marginTop: 20 }}>
        {jobs.map((job) => (
          <li key={job.id} style={{ marginBottom: 15 }}>
            <h4>{job.title}</h4>
            <p>{job.company}</p>
            <p>{job.location}</p>

            <a href={job.link} target="_blank" rel="noopener noreferrer">
              View Job
            </a>

            <br />

            <button onClick={() => handleRemove(job.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
