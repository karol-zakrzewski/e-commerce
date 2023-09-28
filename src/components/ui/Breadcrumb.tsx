import Link from "next/link";

type Props = {
  links: {
    name: string;
    url: string;
  }[];
};

export const Breadcrumb = ({ links }: Props) => {
  return (
    <ol
      className="flex items-center whitespace-nowrap p-4"
      aria-label="Breadcrumb"
    >
      {links.map((link, index) => {
        const showSlash = links.length !== ++index;
        return (
          <li key={`${link.url}-${index}`} className="text-sm text-gray-600">
            <Link className="flex items-center hover:underline" href={link.url}>
              {link.name}
              {showSlash && (
                <svg
                  className="mx-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 13L10 3"
                    stroke="currentColor"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
