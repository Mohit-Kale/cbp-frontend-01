'use client'

import { useAuthDialog } from './useAuthDialog.hook'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SignUpForm from './signUpForm/SignUpForm.component'
import SignInForm from './signInForm/SignInForm.component'

const AuthDialog = () => {
  const { authDialogOpen, authMode, closeAuthDialog, authRole } = useAuthDialog()

  return (
    <Dialog open={authDialogOpen} onOpenChange={closeAuthDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center text-2xl font-bold">Welcome to Boardtide</DialogTitle>

          {/* 👇 Show only when role = consultant */}
          {authRole === 'CONSULTANT' && (
            <div className="text-center text-gray-500">
              For <span className="font-semibold capitalize">{authRole}</span>
            </div>
          )}
        </DialogHeader>

        <Tabs defaultValue={authMode} key={authMode} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <SignInForm />
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
