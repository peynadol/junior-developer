"use client";

export default function Content({ entry }: { entry: Entry }) {
  return (
    <div className="border-2 border-gray-200 p-6 rounded-md bg-white shadow-sm">
      <div
        className="prose mb-6 text-gray-900"
        dangerouslySetInnerHTML={{ __html: entry.processed_content }}
      />

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Cited Sources</h3>
        <ul className="space-y-2">
          {entry.sources.cited.map((src) => (
            <li key={src.id} className="flex items-center gap-2">
              <img src={src.favicon} alt="" width={16} height={16} />
              <a
                href={src.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                {src.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Non-cited sources */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Non-Cited Sources</h3>
        <ul className="space-y-2">
          {entry.sources?.non_cited?.length ? (
            <ul className="space-y-2">
              {entry.sources.non_cited.map((src) => (
                <li key={src.id} className="flex items-center gap-2">
                  <img src={src.favicon} alt="" width={16} height={16} />
                  <a
                    href={src.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {src.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No non-cited sources.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
