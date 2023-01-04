import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import { IGroup } from '@/types/IGroup';
import { TypeLap } from '@/types/TypeLap';
import { IRound } from '@/types/IRound';
import { ISportsman } from '@/types/ISportsman';
import { ILap } from '@/types/ILap';
import {
    Avatar,
    Badge,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import ConstructionIcon from '@mui/icons-material/Construction';
import { sportsmanName } from '@/utils/sportsmanName';
import { story } from '@/story/story';
import { millisecondsToTimeString } from '@/utils/millisecondsToTimeString';
import { ListAllLaps } from '@/modules/rounds/components/ListAllLaps/ListAllLaps';
import { lapDeleteAction, lapInsertAction, lapUpdateAction, loadLapsForGroupAction } from '@/actions/actionLapRequest';
import { TypeRaceStatus } from '@/types/TypeRaceStatus';
import { matrixLapsWithPitStop } from '@/utils/matrixLapsWithPitStop';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { TypeRace } from '@/types/TypeRace';

import styles from './styles.module.scss';

interface IProps {
    round: IRound;
    group: IGroup;
    readonly?: boolean;
    raceStatus?: TypeRaceStatus;
    onChangePosition?: (id: string) => void;
    groupLaps?: ILap[];
}

export const TableResults: FC<IProps> = observer(
    ({ round, group, readonly, raceStatus, onChangePosition, groupLaps }: IProps) => {
        const refTableContainer = useRef<HTMLDivElement>(null);

        const membersGroup = useMemo(() => [...group.sportsmen, ...group.teams], [group.sportsmen, group.teams]);

        function resultS(sportsman: ISportsman | undefined) {
            const _device: number = sportsman?.transponders[0] !== undefined ? sportsman?.transponders[0] : 0;
            console.log(_device);
            const result = story?.mxResults?.get(+_device);
            console.log(result);
            return result;
        }

        function speedF(speed: number | undefined) {
            let _speed = speed == undefined ? 0.0 : speed;

            _speed /= 100;

            return _speed;
        }

        function timeF(time: number | undefined) {
            let _time = time == undefined ? 0.0 : time;

            _time /= 1000;

            return _time;
        }

        return (
            <TableContainer component={Paper} variant="outlined" className={styles.root} ref={refTableContainer}>
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pilot</TableCell>
                            <TableCell>Laps</TableCell>
                            <TableCell>Max speed</TableCell>
                            <TableCell>Best lap</TableCell>
                            <TableCell>Total time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {membersGroup.map((item) => (
                            <TableRow>
                                <TableCell>{sportsmanName(item?.sportsman!)}</TableCell>
                                <TableCell>{resultS(item?.sportsman)?.laps}</TableCell>
                                <TableCell>{speedF(resultS(item?.sportsman)?.best_speed)}</TableCell>
                                <TableCell>{timeF(resultS(item?.sportsman)?.best_time)}</TableCell>
                                <TableCell>{timeF(resultS(item?.sportsman)?.total_time)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
);
