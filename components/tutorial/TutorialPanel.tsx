'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export function TutorialPanel() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-blue-50 mt-14">
      <div className="max-w-7xl mx-auto p-4 relative">
        <div className='flex justify-between pb-2'>
          <h2 className="text-lg font-semibold text-blue-800">
            👋 Welcome to your Trello-like Board!
          </h2>
          <button
            onClick={() => setIsVisible(false)}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            CLOSE <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TutorialCard
              title="Creating Lists"
              steps={[
                "Click the 'Create List' button on the right",
                "Enter your list title",
                "Click 'Create List' or press Enter"
              ]}
            />

            <TutorialCard
              title="Managing Items"
              steps={[
                "Add items using the input at the bottom of each list",
                "Click on any item to edit its content",
                "Use the Save button to confirm changes",
                "Hover over items to see the delete option"
              ]}
            />

            <TutorialCard
              title="Organizing Your Board"
              steps={[
                "Drag and drop lists to reorder them",
                "Drag items within a list to reorder",
                "Move items between lists by dragging",
                "Click list titles to rename them"
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type TutorialCardProps = {
  title: string
  steps: string[]
}

function TutorialCard({ title, steps }: TutorialCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-800 mb-2">{title}</h3>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-2 text-gray-600 text-sm">
            <span className="text-blue-500">•</span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  )
}