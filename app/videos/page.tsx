import { PageHero } from "@/components/ui";
import VideoLibrary from "@/components/VideoLibrary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Library | Tuistech Fitness",
  description: "Follow-along daily exercise videos for strength, weight loss, youth and kids.",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Video library"
        title="Press play. Start the set."
        description="Follow-along sessions you can run from your living room, filed by focus and level. New sessions added every week."
      />
      <VideoLibrary />
    </>
  );
}
