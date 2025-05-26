export  interface AnalyticsData {
  // Define the properties of AnalyticsData here
  // example:
  monthlyRegistrations: any[];
  userStatusCounts: any[];
  totalUsers: number;
  activeUsers: number;
}
export interface MonthlyRegistration {
  month: string;
  count: number;
}
export interface UserStatusCount {
  status: string;
  count: number;
}
export interface AnalyticsResponse {
  monthlyRegistrations: MonthlyRegistration[];
  userStatusCounts: UserStatusCount[];
}
