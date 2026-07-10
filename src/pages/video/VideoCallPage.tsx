import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Monitor } from "lucide-react";
import { useState } from "react";

export const VideoCallPage = () => {
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Video Meeting</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl h-80 flex items-center justify-center text-white">
          Your Camera
        </div>

        <div className="bg-gray-800 rounded-xl h-80 flex items-center justify-center text-white">
          Participant
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">

        <button
          onClick={() => setMic(!mic)}
          className="bg-blue-600 p-4 rounded-full text-white"
        >
          {mic ? <Mic /> : <MicOff />}
        </button>

        <button
          onClick={() => setCamera(!camera)}
          className="bg-green-600 p-4 rounded-full text-white"
        >
          {camera ? <Video /> : <VideoOff />}
        </button>

        <button
          className="bg-yellow-500 p-4 rounded-full text-white"
        >
          <Monitor />
        </button>

        <button
          className="bg-red-600 p-4 rounded-full text-white"
        >
          <PhoneOff />
        </button>

      </div>
    </div>
  );
};