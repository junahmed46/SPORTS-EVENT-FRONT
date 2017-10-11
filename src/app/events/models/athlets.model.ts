/* Athlets Class
ID sport_athlet_progress table id
first_name first name of athlet
sur_name family name of atlet
SE_id sport_events table id to determine the relation of athlet with sport_events table
A_id athlet table id
code_identifier is unique number assigned to particular athlet for specific event
start_number when he is going to start the event
*/

export class Athlets {
  id: number;
  first_name: string;
  sur_name: string;
  SE_id: number;
  A_id: number;
  code_identifier: string;
  start_number: number;
  created_at: string;
  updated_at: string;
}
