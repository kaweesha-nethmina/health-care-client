// Nurse service for handling nurse-related API calls
import { api, ApiResponse } from "@/lib/api"

// Patient care information interface
export interface PatientCareInfo {
  id?: number
  patient_id: number
  vital_signs: string
  medication_administered: string
  notes: string
  created_at?: string
  updated_at?: string
}

export class NurseService {
  // Update patient care information
  static async updatePatientCare(patientId: number, data: PatientCareInfo): Promise<ApiResponse<PatientCareInfo>> {
    return api.post<PatientCareInfo>(`/nurses/patients/${patientId}/care`, data)
  }

  // Get patient care history
  static async getPatientCareHistory(patientId: number): Promise<ApiResponse<PatientCareInfo[]>> {
    return api.get<PatientCareInfo[]>(`/nurses/patients/${patientId}/care`)
  }
}