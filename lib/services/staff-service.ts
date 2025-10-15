// Hospital staff service for handling staff-related API calls
import { api, ApiResponse } from "@/lib/api"

// Patient information interface
export interface PatientInfo {
  id: number
  user_id: number
  name: string
  email: string
  date_of_birth: string
  gender: string
  phone_number: string
  address: string
  created_at: string
  updated_at: string
}

// Check-in information interface
export interface CheckInInfo {
  id?: number
  patient_id: number
  check_in_time: string
  department: string
  reason_for_visit: string
  created_at?: string
}

export class StaffService {
  // Patient check-in
  static async checkInPatient(patientId: number, data: CheckInInfo): Promise<ApiResponse<CheckInInfo>> {
    return api.post<CheckInInfo>(`/staff/check-in/${patientId}`, data)
  }

  // Get patient information
  static async getPatientInfo(patientId: number): Promise<ApiResponse<PatientInfo>> {
    return api.get<PatientInfo>(`/staff/patients/${patientId}`)
  }
}