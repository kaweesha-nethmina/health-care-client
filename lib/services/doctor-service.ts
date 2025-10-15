// Doctor service for handling doctor-related API calls
import { api, ApiResponse } from "@/lib/api"

// Doctor profile interface
export interface DoctorProfile {
  id: number
  user_id: number
  specialty: string
  qualification: string
  schedule: string
  created_at: string
  updated_at: string
}

// Doctor medical record interface
export interface DoctorMedicalRecord {
  id: number
  patient_id: number
  doctor_id: number
  diagnosis: string
  treatment_plan: string
  prescriptions: string
  record_date: string
  updated_at: string
}

export class DoctorService {
  // Get doctor profile
  static async getProfile(): Promise<ApiResponse<DoctorProfile>> {
    return api.get<DoctorProfile>("/doctors/profile")
  }

  // Update doctor profile
  static async updateProfile(data: Partial<DoctorProfile>): Promise<ApiResponse<DoctorProfile>> {
    return api.put<DoctorProfile>("/doctors/profile", data)
  }

  // View patient medical records
  static async getPatientMedicalRecords(patientId: number): Promise<ApiResponse<DoctorMedicalRecord[]>> {
    return api.get<DoctorMedicalRecord[]>(`/doctors/patients/${patientId}/medical-records`)
  }

  // Create medical record for patient
  static async createMedicalRecord(patientId: number, data: Partial<DoctorMedicalRecord>): Promise<ApiResponse<DoctorMedicalRecord>> {
    return api.post<DoctorMedicalRecord>(`/doctors/patients/${patientId}/medical-records`, data)
  }

  // Get appointment schedule
  static async getAppointmentSchedule(): Promise<ApiResponse<any[]>> {
    return api.get<any[]>("/doctors/appointments")
  }
}