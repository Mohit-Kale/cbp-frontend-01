'use client'

import React, { useState } from 'react'
import { DataTable } from '@/components/dataTable/DataTable.component'
import { CalendarDays, Plus } from 'lucide-react'
import useConsultantSchedulesColumns from './useConsultantSchedulesColumns.hook'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'
import ScheduleForm from './ScheduleForm.component'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ConsultantSchedule, useMySchedulesQuery } from '@/redux/services/consultant.api'

export default function ConsultantSchedulesTable() {
  const [page, setPage] = useState(1)
  const { data, isFetching, isError, refetch } = useMySchedulesQuery()

  const [editingSchedule, setEditingSchedule] = useState<ConsultantSchedule | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [viewingSchedule, setViewingSchedule] = useState<ConsultantSchedule | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const { columns } = useConsultantSchedulesColumns({
    onEdit: (schedule) => {
      setEditingSchedule(schedule)
      setIsEditDialogOpen(true)
    },
    onView: (schedule) => {
      setViewingSchedule(schedule)
      setIsViewDialogOpen(true)
    },
  })

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-medium text-gray-700">My Schedules</h2>
        </div>

        {/* Add Schedule Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full w-full sm:max-w-3xl overflow-auto">
            <DialogTitle>Add Schedule</DialogTitle>
            <div className="w-full overflow-x-auto">
              <ScheduleForm
                onSaved={() => {
                  setIsOpen(false)
                  refetch()
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <RenderComponent isLoading={isFetching} isError={isError} loader={<TableSkeleton />}>
          <DataTable columns={columns} data={data || []} page={page} setPage={setPage} totalPages={1} isPaginationEnabled={false} />
        </RenderComponent>
      </div>

      {/* Edit Schedule Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-full w-full sm:max-w-3xl overflow-auto">
          <DialogTitle>Edit Schedule</DialogTitle>
          {editingSchedule && (
            <div className="w-full overflow-x-auto">
              <ScheduleForm
                id={editingSchedule.id}
                defaultValues={editingSchedule}
                onSaved={() => {
                  setIsEditDialogOpen(false)
                  setEditingSchedule(null)
                  refetch()
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Schedule Dialog (Read-only) */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-full w-full sm:max-w-3xl overflow-auto">
          <DialogTitle>View Schedule</DialogTitle>
          {viewingSchedule && (
            <div className="w-full overflow-x-auto">
              <ScheduleForm
                defaultValues={viewingSchedule}
                isReadOnly={true} // ✅ Make the form read-only
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
