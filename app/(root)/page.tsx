import InterviewCard from "@/Components/InterviewCard";
import { Button } from "@/Components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-powered Practice and Feedback</h2>
          <p className="text-lg">
            Practice on real interviw qwestions & get instant feedback.
          </p>
          
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href='/interview' >Start an Interview</Link>
          </Button>
        </div>

        <Image src='/robot.png' alt="robo" width={400} height={400} className="max-sm:hidden"/>
      </section>

      <section className="flex flex-col gap-6 mt-8 ">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) =>(
            <InterviewCard/>
          ))}
          You haven&apos;t taken any interview yet
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview </h2>

        <div className="interviews-section">
          <p>There are no interviews available</p>
        </div>

      </section>

    </>
  );
}
