"use client"

export default function LearningTab() {
  return (
    <div className="space-y-4">
      <p className="text-gray-300">
        Currently leveling up these skills ⚡
      </p>

      <ul className="space-y-3">
        <li className="p-4 bg-gray-800 rounded-xl">
          ⚛️ Advanced Next.js patterns
        </li>
        <li className="p-4 bg-gray-800 rounded-xl">
          🎨 UI/UX — making things feel smooth
        </li>
        <li className="p-4 bg-gray-800 rounded-xl">
          🤖 Playing with AI APIs + integrations
        </li>
      </ul>
    </div>
  );
}