// import MessageTrainer from '@/components/MessageTrainer'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
// import { ProviderDTO } from '@/dto'
// import React from 'react'

// export default function MessageDialog({ trainerData, showMessageForm, setShowMessageForm }: { trainerData: ProviderDTO; showMessageForm: boolean; setShowMessageForm: (showMessageForm: boolean) => void }) {
//   return (
//     <Dialog open={showMessageForm} onOpenChange={setShowMessageForm}>
//       <DialogContent className="max-w-2xl max-h-[90vh]">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">Message {trainerData?.user?.fullName}</DialogTitle>
//         </DialogHeader>
//         <MessageTrainer trainerData={trainerData!} onClose={() => setShowMessageForm(false)} />
//       </DialogContent>
//     </Dialog>
//   )
// }
