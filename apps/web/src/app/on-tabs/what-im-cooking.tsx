"use client"

export default function CookingTab() {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Stuff I’m currently building or messing around with 👇
      </p>

      <ul className="space-y-3">
        <li className="p-4 bg-gray-800 rounded-xl">
          🚀 Portfolio revamp (this one)
        </li>
        <li className="p-4 bg-gray-800 rounded-xl">
          🧠 AI-powered mini tools (just experimenting tbh)
        </li>
        <li className="p-4 bg-gray-800 rounded-xl">
          📱 Side project — still in “what if this works” phase
        </li>
      </ul>
    </div>
  );
}