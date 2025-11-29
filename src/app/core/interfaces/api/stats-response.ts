export interface StatsResponse {
  success: boolean,
  message: string,
  patientId: number,
  indicatorId: number,
  indicatorName: string,
  data?: Stat[]
}

export interface Stat{
  date: string,
  value: number
}

export interface StatSeries{
  name: string,
  points: Stat[]
}
