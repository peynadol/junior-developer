"use client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Entry } from "@/types/data";

type Props = {
  entry: Entry;
};

export default function Content({ entry }: Props) {
  return (
    <article className="text-left text-lg">
      {/* Main content section */}
      <section className="mb-6 leading-relaxed" aria-label="Main content">
        <ReactMarkdown>{entry.processed_content}</ReactMarkdown>
      </section>

      {/* Sources section */}
      <nav aria-label="Content sources and references">
        {/* Cited Sources */}
        <section className="mb-4">
          <h2 className="font-semibold mb-2 text-xl">Cited Sources</h2>
          {entry.sources.cited.length > 0 ? (
            <ul className="space-y-2">
              {entry.sources.cited.map((src, index) => {
                const letter = String.fromCharCode(65 + index);
                return (
                  <li
                    key={src.id}
                    id={`cite-${letter}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="font-mono text-sm font-semibold bg-gray-100 px-2 py-1 rounded"
                      aria-label={`Citation ${letter}`}
                    >
                      [{letter}]
                    </span>
                    <Image
                      src={src.favicon}
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                    <a
                      href={src.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                      aria-label={`Read source: ${src.title} (opens in new tab)`}
                    >
                      {src.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No cited sources available.</p>
          )}
        </section>

        {/* Non Cited Sources */}
        <section>
          <h2 className="font-semibold text-gray-800 mb-2 text-xl">
            Additional Sources
          </h2>
          {entry.sources?.non_cited?.length ? (
            <>
              <p className="text-sm text-gray-600 mb-3">
                Additional sources consulted but not directly cited in the
                content above.
              </p>
              <ul className="space-y-2">
                {entry.sources.non_cited.map((src) => (
                  <li key={src.id} className="flex items-center gap-2">
                    <Image
                      src={src.favicon}
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                    <a
                      href={src.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                      aria-label={`Read additional source: ${src.title} (opens in new tab)`}
                    >
                      {src.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              No additional sources available.
            </p>
          )}
        </section>
      </nav>
    </article>
  );
}
