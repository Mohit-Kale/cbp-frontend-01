// dto/UserDTO.ts
export interface UserDTO {
  id: number
  email: string
  roles: number[]
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'INACTIVE'
}

export interface LoginResponse {
  statusCode: number
  message: string
  token: string
  data: UserDTO
}
