import { ISportsman } from '@/types/ISportsman';

export const sportsmanName = (sportsman: ISportsman): string =>
    `${sportsman.lastName || ''}${sportsman.firstName ? ` ${sportsman.firstName}` : ''} ${
        sportsman.middleName ? ` ${sportsman.middleName}` : ''
    }${sportsman.nick ? ` (${sportsman.nick})` : ''}`;