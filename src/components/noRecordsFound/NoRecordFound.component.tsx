import { Blocks } from '../animateIcons/Block'

export default function NoRecordsFound({ isCard = true, title = 'No Records Found', description = 'There’s nothing to display at the moment.' }: { title?: string; description?: string; isCard?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl ${isCard ? 'shadow-sm bg-white border border-gray-100' : ''}`}>
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/70 text-primary mb-4">
        <Blocks className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  )
}
