import { DownloadResume } from "./DownloadResume";

export function InConstructionComponent() {

  return (
    <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-50">
      <div className="lg:relative">
        <h1 className="text-4xl font-bold">This website is under <span className="lg:relative -top-4 -left-7 inline-block construction-animation text-rose-700">construction</span></h1>
      </div>
      <div className="text-2xl text-center mb-4">You can still come back another time, or you can download my CV by clicking the link below</div>
      <DownloadResume />
    </div>
  )
}