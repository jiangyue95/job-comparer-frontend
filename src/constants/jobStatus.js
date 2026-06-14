// Job status enum values - mirror of backend JobStatus enum
export const JOB_STATUS = {
    SAVED: 'SAVED',
    APPLIED: 'APPLIED',
    INTERVIEWING: 'INTERVIEWING',
    OFFERED: 'OFFERED',
    REJECTED: 'REJECTED',
    DECLINED: 'DECLINED',
    ARCHIVED: 'ARCHIVED',
}

// Used for rendering dropdown options
export const JOB_STATUS_OPTIONS = Object.values(JOB_STATUS)

// Job status enum values colors
export const STATUS_COLORS = {
  SAVED: 'bg-gray-100 text-gray-800',
  APPLIED: 'bg-blue-100 text-blue-800',
  INTERVIEWING: 'bg-yellow-100 text-yellow-800',
  OFFERED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  DECLINED: 'bg-orange-100 text-orange-800',
  ARCHIVED: 'bg-gray-100 text-gray-500',
}