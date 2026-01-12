import JobSearch from "../components/JobSearch";
import Link from "next/link";

<Link href="/saved-jobs">Saved Jobs</Link>


export default function Home() {
  return (
    <main>
      <JobSearch />
    </main>
  );
}
