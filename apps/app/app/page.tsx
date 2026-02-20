import dynamic from "next/dynamic";

const CanvasWorkspace = dynamic(
  () => import("../components/CanvasWorkspace"),
  { ssr: false }
);

export default function AppPage() {
  return <CanvasWorkspace />;
}
