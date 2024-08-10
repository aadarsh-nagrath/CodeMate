import CreateRoomForm from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Create A Session</h1>
        <CreateRoomForm />
      </div>
    </div>
  );
}
