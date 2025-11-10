export interface Slot {
  start: string
  end: string
  isAvailable: boolean
}

export interface Availability {
  date: string
  slots: Slot[]
}

export interface ProviderSlotAvailability {
  providerId: number
  startDate: string
  endDate: string
  availability: Availability[]
}
