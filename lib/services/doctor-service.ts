// Doctor service for handling doctor-related API calls
import { api, ApiResponse } from "@/lib/api"

// Doctor profile interface
export interface DoctorProfile {
  id: number
  user_id: number
  specialty: string
  qualification: string
  schedule: string
  location: string
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

// Appointment interface
export interface DoctorAppointment {
  id: number
  patient_id: number
  doctor_id: number
  appointment_date: string
  status: string
  location: string
  created_at: string
  updated_at: string
  patients?: {
    user_id: number
    users?: {
      name: string
    }
  }
  patient?: {
    id: number
    user_id: number
    name: string
    email: string
    date_of_birth: string | null
    gender: string
    phone_number: string
    address: string
    insurance_details: string | null
    medical_history: string | null
    emergency_contact: string
    profile_picture_url: string | null
  }
  doctor?: {
    id: number
    user_id: number
    name: string
    email: string
    specialty: string
    qualification: string
    schedule: string
    phone_number: string | null
    address: string | null
    profile_picture_url: string | null
  }
}

// Patient interface
export interface DoctorPatient {
  id: number
  user_id: number
  date_of_birth: string | null
  gender: string
  phone_number: string
  address: string
  insurance_details: string | null
  medical_history: string | null
  emergency_contact: string
  preferred_location: string | null
  created_at: string
  updated_at: string
  users: {
    name: string
    email: string
  }
  user?: {
    profile_picture_url: string | null
  }
}

// Patient details interface
export interface PatientDetails {
  id: number
  user_id: number
  name: string
  email: string
  date_of_birth: string | null
  age: number | null
  gender: string
  phone_number: string
  address: string
  emergency_contact: string
  insurance_details: string | null
  medical_history: string | null
  profile_picture_url: string | null
  created_at: string
  updated_at: string
  medical_records: {
    id: number
    diagnosis: string
    treatment_plan: string
    prescriptions: string
    record_date: string
    updated_at: string
    doctor_name: string
  }[]
  vital_signs: {
    id: number
    vital_signs: string
    recorded_at: string
    updated_at: string
    nurse_name: string
  }[]
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
  static async getAppointmentSchedule(): Promise<ApiResponse<DoctorAppointment[]>> {
    return api.get<DoctorAppointment[]>("/doctors/appointments")
  }

  // Get medical record by ID
  static async getMedicalRecordById(recordId: number): Promise<ApiResponse<DoctorMedicalRecord>> {
    return api.get<DoctorMedicalRecord>(`/doctors/medical-records/${recordId}`)
  }

  // Update medical record
  static async updateMedicalRecord(recordId: number, data: Partial<DoctorMedicalRecord>): Promise<ApiResponse<DoctorMedicalRecord>> {
    return api.put<DoctorMedicalRecord>(`/doctors/medical-records/${recordId}`, data)
  }

  // Delete medical record
  static async deleteMedicalRecord(recordId: number): Promise<ApiResponse<null>> {
    return api.delete<null>(`/doctors/medical-records/${recordId}`)
  }

  // Get all patients
  static async getAllPatients(): Promise<ApiResponse<DoctorPatient[]>> {
    return api.get<DoctorPatient[]>("/nurses/patients")
  }

  // Get patient details
  static async getPatientDetails(patientId: number): Promise<ApiResponse<PatientDetails>> {
    return api.get<PatientDetails>(`/doctors/patients/${patientId}/details`)
  }

  // Get patient appointments
  static async getPatientAppointments(patientId: number): Promise<ApiResponse<DoctorAppointment[]>> {
    return api.get<DoctorAppointment[]>(`/doctors/patients/${patientId}/appointments`)
  }

  // Get all medical records for the doctor (for all patients)
  static async getAllMedicalRecords(): Promise<ApiResponse<DoctorMedicalRecord[]>> {
    // This is a placeholder - in a real implementation, there would be a specific endpoint
    // For now, we'll handle this in the UI by fetching records for each patient
    throw new Error("Not implemented - fetch records per patient instead")
  }
}