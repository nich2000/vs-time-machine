import { TypeChromaKey } from '@/types/TypeChromaKey';

export interface IBroadCast {
    _id: string;
    competitionId: string;
    showMainLogo: boolean;
    name: string;
    top: string;
    left: string;
    left2: string;
    center: string;
    center2: string;
    right: string;
    right2: string;
    bottom: string;
    chromaKey: TypeChromaKey;
}
