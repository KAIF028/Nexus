import { useState } from "react";

type Document = {
  id: number;
  name: string;
  status: "Draft" | "In Review" | "Signed";
};

export const DocumentChamber = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [signature, setSignature] = useState("");

  const uploadDocument = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setDocuments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: file.name,
        status: "Draft",
      },
    ]);
  };

  const updateStatus = (
    id: number,
    status: "Draft" | "In Review" | "Signed"
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status } : doc
      )
    );
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        📄 Document Chamber
      </h1>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={uploadDocument}
        className="mb-6"
      />

      <div className="mb-8 border rounded-lg p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">
          ✍ E-Signature
        </h2>

        <input
          type="text"
          placeholder="Type your signature..."
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />

        {signature && (
          <div className="mt-4">
            <p className="text-gray-600">
              Signature Preview:
            </p>

            <h2
              className="text-3xl italic text-blue-700"
              style={{ fontFamily: "cursive" }}
            >
              {signature}
            </h2>
          </div>
        )}
      </div>

      {documents.map((doc) => (
        <div
          key={doc.id}
          className="border rounded-lg p-4 mb-4"
        >
          <h3 className="font-semibold">
            {doc.name}
          </h3>

          <p className="mb-3">
            Status:
            <span className="font-bold ml-2">
              {doc.status}
            </span>
          </p>

          <div className="flex gap-3">

            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() =>
                updateStatus(doc.id, "In Review")
              }
            >
              In Review
            </button>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() =>
                updateStatus(doc.id, "Signed")
              }
            >
              Signed
            </button>

          </div>

        </div>
      ))}
    </div>
  );
};