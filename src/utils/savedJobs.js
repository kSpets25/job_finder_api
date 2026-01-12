const STORAGE_KEY = "saved_jobs";

export function getSavedJobs() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveJob(job) {
  const jobs = getSavedJobs();

  // prevent duplicates
  const exists = jobs.some((j) => j.id === job.id);
  if (!exists) {
    jobs.push(job);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }
}

export function removeJob(id) {
  const jobs = getSavedJobs().filter((job) => job.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}
