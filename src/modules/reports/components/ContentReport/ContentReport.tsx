import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { IReport } from '@/types/IReport';
import { TypeReport } from '@/types/TypeReport';
import { BestLapReport } from '@/modules/reports/components/BestLapReport/BestLapReport';
import { story } from '@/story/story';
import { CountLapsReport } from '@/modules/reports/components/CountLapsReport/CountLapsReport';
import { BestPitStopReport } from '@/modules/reports/components/BestPitStopReport/BestPitStopReport';
import { PositionSportsmenReport } from '@/modules/reports/components/PositionSportsmenReport/PositionSportsmenReport';
import { RoundGroupsReport } from '@/modules/reports/components/RoundGroupsReport/RoundGroupsReport';
import { RoundGroupsLaps } from '@/modules/reports/components/RoundGroupsLaps/RoundGroupsLaps';
import { MXResultsReport } from '@/modules/reports/components/MXResultsReport/MXResultsReport';
import { MXLapsReport } from '@/modules/reports/components/MXLapsReport/MXLapsReport';

interface IProps {
    report: IReport;
    className?: string;
    isBroadcast?: boolean;
}

export const ContentReport: FC<IProps> = observer(({ report, isBroadcast, className }: IProps) => {
    return (
        <div className={className}>
            {report.type === TypeReport.MX_RESULTS && <MXResultsReport report={report} />}
            {report.type === TypeReport.MX_LAPS && <MXLapsReport report={report} />}
            {report.type === TypeReport.BEST_LAP && (
                <BestLapReport report={report} rounds={story.rounds} sportsmen={story.sportsmen} teams={story.teams} />
            )}
            {report.type === TypeReport.COUNT_LAPS && (
                <CountLapsReport
                    isBroadcast={isBroadcast}
                    report={report}
                    rounds={story.rounds}
                    sportsmen={story.sportsmen}
                    teams={story.teams}
                />
            )}
            {report.type === TypeReport.BEST_PIT_STOP && (
                <BestPitStopReport
                    report={report}
                    rounds={story.rounds}
                    sportsmen={story.sportsmen}
                    teams={story.teams}
                />
            )}
            {report.type === TypeReport.POSITION_SPORTSMEN && (
                <PositionSportsmenReport report={report} sportsmen={story.sportsmen} teams={story.teams} />
            )}
            {report.type === TypeReport.ROUND_GROUPS_LAPS && <RoundGroupsLaps report={report} rounds={story.rounds} />}
            {report.type === TypeReport.ROUND_GROUPS && <RoundGroupsReport report={report} />}
        </div>
    );
});
