import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { IGroup } from '@/types/IGroup';
import { TypeLap } from '@/types/TypeLap';
import { IRound } from '@/types/IRound';
import { ISportsman } from '@/types/ISportsman';
import { ILap } from '@/types/ILap';
import {
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
import ListIcon from '@mui/icons-material/List';
import { sportsmanName } from '@/utils/sportsmanName';
import { story } from '@/story/story';
import { millisecondsToTimeString } from '@/utils/millisecondsToTimeString';
import { ListAllLaps } from '@/modules/rounds/components/ListAllLaps/ListAllLaps';

import styles from './styles.module.scss';
import { TypeStartRace } from '@/types/TypeStartRace';
import { lapDeleteAction, lapUpdateAction } from '@/actions/actionLapRequest';

interface IProps {
    round: IRound;
    group: IGroup;
}

export const TableLaps: FC<IProps> = observer(({ round, group }: IProps) => {
    const [openLapsMember, setOpenLapsMember] = useState<string | undefined>(undefined);
    const laps = window.api.groupLapsByMemberGroup(_.cloneDeep(group), _.cloneDeep(story.laps));
    const groupWithPositions = window.api.positionCalculation(_.cloneDeep(round), _.cloneDeep(group), laps);
    const maxCountLap = [...groupWithPositions.sportsmen, ...groupWithPositions.teams].reduce(
        (count, item) => (laps[item._id].length > count ? laps[item._id].length : count),
        0
    );

    const getPositionLap = (indx: number): number | string => {
        if (round.typeStartRace === TypeStartRace.START_AFTER_FIRST_GATE) {
            if (indx === 0) return '';
            return indx;
        }
        return indx + 1;
    };

    const Cell: FC<{ memberGroupId: string; indx: number }> = ({
        memberGroupId,
        indx
    }: {
        memberGroupId: string;
        indx: number;
    }) => {
        const lap = laps[memberGroupId][indx];
        const minLap = _.minBy<ILap>(
            laps[memberGroupId]?.filter((item: ILap) => item.typeLap === TypeLap.OK),
            'timeLap'
        );
        let textLap = '';
        if (lap?.typeLap === TypeLap.START) textLap = 'Start';
        if (lap?.typeLap === TypeLap.OK) textLap = millisecondsToTimeString(lap.timeLap);
        if (minLap && lap && minLap.timeLap === lap.timeLap)
            return (
                <TableCell>
                    <b>{textLap}</b>
                </TableCell>
            );
        return <TableCell>{textLap}</TableCell>;
    };

    const membersGroup = [...groupWithPositions.sportsmen, ...groupWithPositions.teams];
    // Под вопросом, нужна ли сортировка группы по позиции.
    // .sort(
    //     (g1, g2) => (g1.position || 9999) - (g2.position || 9999)
    // );

    const handleOpenAllLaps = useCallback((id: string) => () => setOpenLapsMember(id), []);

    const handleCloseAllLaps = useCallback(() => {
        setOpenLapsMember(undefined);
    }, []);

    const handleDeleteLap = useCallback((id: string) => lapDeleteAction(id), []);
    const handleUpdateLap = useCallback((id: string, lap: Pick<ILap, 'typeLap'>) => lapUpdateAction(id, lap), []);

    const countLapsForMember = (id: string) =>
        ((story.laps || []).filter((lap: ILap) => lap.memberGroupId === id) || []).length;
    return (
        <TableContainer component={Paper} variant="outlined" className={styles.root}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Lap</TableCell>
                        {membersGroup.map((item) => (
                            <TableCell key={item._id} className={cn({ [styles.searched]: item?.searchTransponder })}>
                                <div className={styles.header}>
                                    <div>
                                        {item.sportsman ? (
                                            <b>{`${sportsmanName(item?.sportsman!)} - ${(
                                                item?.sportsman?.transponders || []
                                            ).join(',')}`}</b>
                                        ) : (
                                            <Tooltip
                                                title={
                                                    <>
                                                        {item.team?.sportsmen
                                                            ?.filter((sportsman: ISportsman) => !!sportsman)
                                                            ?.map((sportsman: ISportsman) => (
                                                                <div
                                                                    key={sportsman._id}
                                                                    className={cn({
                                                                        [styles.searchedTeamSportsmen]: (
                                                                            item.searchTeamSportsmenIds || []
                                                                        ).includes(sportsman._id)
                                                                    })}
                                                                >
                                                                    {`${sportsmanName(sportsman)} - ${(
                                                                        sportsman.transponders || []
                                                                    ).join(',')}`}
                                                                </div>
                                                            ))}
                                                    </>
                                                }
                                                arrow
                                            >
                                                <b>{item?.team?.name}</b>
                                            </Tooltip>
                                        )}
                                    </div>
                                    <IconButton onClick={handleOpenAllLaps(item._id)}>
                                        <Badge badgeContent={countLapsForMember(item._id)} color="secondary">
                                            <ListIcon />
                                        </Badge>
                                    </IconButton>
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array(maxCountLap)
                        .fill(0)
                        .map((_, indx) => (
                            <TableRow key={indx}>
                                <TableCell>{getPositionLap(indx)}</TableCell>
                                {membersGroup.map((item) => (
                                    <Cell key={item._id} memberGroupId={item._id} indx={indx} />
                                ))}
                            </TableRow>
                        ))}
                    <TableRow>
                        <TableCell>
                            <b>Pos:</b>
                        </TableCell>
                        {membersGroup.map((item) => (
                            <TableCell key={item._id}>
                                <b>{item.position || 'DNS'}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
            {!!openLapsMember && (
                <ListAllLaps
                    laps={_.sortBy(
                        (story.laps || []).filter((lap: ILap) => lap.memberGroupId === openLapsMember) || [],
                        ['millisecond']
                    )}
                    open={!!openLapsMember}
                    onClose={handleCloseAllLaps}
                    onDelete={handleDeleteLap}
                    onUpdate={handleUpdateLap}
                />
            )}
        </TableContainer>
    );
});
