import { CustomFile } from 'src/components/upload';
import { Organizer } from './events';

export interface Tournament {
  id: number;
  game: {
    id: number;
    game_name: string;
    game_image: string;
    game_type: string;
    elimination_modes: { id: number; elimination_mode: string }[];
  };
  faqs: { id: number; value: string; heading: string; detail: string }[];
  sponsors: {
    id: number;
    sponsor_name: string;
    sponsorship_category: string;
    order: number;
    sponsor_banner: CustomFile | string | null;
    sponsor_link: string;
  }[];
  streams: { id: number; stream_title: string; url: string }[];
  slug: string;
  location: string;
  tournament_name: string;
  tournament_logo: CustomFile | string | null;
  tournament_banner: CustomFile | string | null;
  tournament_mode: string;
  tournament_status: string;
  tournament_participants: 'Player' | 'Team' | '';
  is_free: boolean;
  tournament_fee: number;
  maximum_no_of_participants: number;
  tournament_description: string;
  tournament_short_description: string;
  tournament_rules: string;
  tournament_prize_pool: string;
  registration_opening_date: string;
  registration_closing_date: string;
  tournament_start_date: string;
  tournament_end_date: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  is_registration_enabled: boolean;
  accept_registration_automatic: boolean;
  contact_email: string;
  discord_link: string;
  is_verified: boolean;
  no_of_participants: number;
  organizer: Organizer;
}

export type ITournamentStreams = {
  id: number;
  stream_title: string;
  url: string;
};
