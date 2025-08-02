"use client";

export default function Content({ data }) {
  // TODO: Implement the content component to render out the content and sources
  console.log(data[0].processed_content);
  const testData = data[0].processed_content;
  return (
    <div className="border-2 border-gray-300 p-4 rounded-md">
     dangerouslySetInnerHTML={{ __html: testData }} />
    </div>
  );
}
