import { CustomFile } from 'src/components/upload';

export type Organizer = {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
    email: string;
  };
  organizer_name: string;
};

type FAQ = {
  id: number;
  value: string;
  heading: string;
  detail: string;
};

export type ISponsor = {
  id: number;
  sponsor_name: string;
  sponsorship_category: string;
  sponsor_banner: string;
  sponsor_link: string;

};

export type EventData = {
  event: {
    id: number;
    organizer: Organizer;
    event_name: string;
    event_description: string;
    event_start_date: Date | string;
    event_end_date: Date | string;
    event_thumbnail: CustomFile | string | null;
    event_thumbnail_alt_description: string;
    slug: string;
    is_verified: boolean;
  };
  faqs: FAQ[];
  sponsors: ISponsor[];
};
