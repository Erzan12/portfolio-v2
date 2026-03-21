"use client"

export default function IntoTab() {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Random things I’m into lately 👀
      </p>

      <ul className="space-y-3">
        <li className="p-4 bg-gray-800 rounded-xl">
          🎧 Music while coding (non-stop)
        </li>
        <li className="p-4 bg-gray-800 rounded-xl">
          ☕ Late night building sessions
        </li>
        <li className="p-4 bg-gray-800 rounded-xl">
          🎮 Casual gaming / chill breaks
        </li>
      </ul>
    </div>
  );
}