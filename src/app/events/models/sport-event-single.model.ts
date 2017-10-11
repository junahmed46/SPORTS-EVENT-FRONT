import {Athlets} from './athlets.model';

export class SportEventSingle {
  id: number;
  event_start: string;
  created_at: string;
  updated_at: string;
  sport_event_athlets: Array<Athlets>;

}
