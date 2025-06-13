import Link from "next/link";

type LinkProps = {
  to: "home" | "events" | "classroom" | "sources";
};

const LabeledLink = ({ to }: LinkProps) => {
  const linkText = {
    home: "Home",
    events: "Events",
    classroom: "Classroom",
    sources: "Sources",
  };

  return (
    <div>
      <Link
        className="text-lg font-sm hover:text-blue-600 hover:underline transition-all duration-300"
        href={to === "home" ? "/" : `/${to}`}
      >
        {linkText[to]}
      </Link>
    </div>
  );
};

export default LabeledLink;
