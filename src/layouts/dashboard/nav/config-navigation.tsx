// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
// import Label from '../../../components/label';
// import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

export enum UserRole {
  Admin = 'Admin',
  Player = 'Player',
  BlogWriter = 'Blog Writer',
  Organizer = 'Organizer',
  Organization = 'Organization',
}

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  application: icon('ic_application'),
  student: icon('ic_student'),
  quote: icon('ic_quote'),
  provider: icon('ic_provider'),
  finance: icon('ic_finance'),
  report: icon('ic_report'),
  setting: icon('ic_setting'),
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  testimonial: icon('ic_testimonials'),
  faq: icon('ic_faq'),
  ourTeam: icon('ic_ourTeam'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Applications', path: PATH_DASHBOARD.application, icon: ICONS.application },
      { title: 'Students', path: PATH_DASHBOARD.student, icon: ICONS.student },
      { title: 'Quotes', path: PATH_DASHBOARD.quote, icon: ICONS.quote },
      { title: 'Providers', path: PATH_DASHBOARD.provider, icon: ICONS.provider },
      { title: 'Finance', path: PATH_DASHBOARD.finance, icon: ICONS.finance },
      { title: 'Reports', path: PATH_DASHBOARD.report, icon: ICONS.report },
      { title: 'Settings', path: PATH_DASHBOARD.setting, icon: ICONS.setting },
    ],
  },
];

export default navConfig;
