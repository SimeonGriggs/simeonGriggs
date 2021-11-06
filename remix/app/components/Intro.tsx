import PortableText from "~/components/PortableText";

export default function Intro({ blocks = [] }) {
  return (
    <div className="bg-blue-500 text-white font-mono md:text-lg p-4 md:p-8 intro">
      <PortableText blocks={blocks} />
    </div>
  );
}
