import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    InputAdornment,
    Switch,
    Tab,
    Tabs,
    TextField
} from '@mui/material';
import { ICompetition } from '@/types/ICompetition';

import styles from './styles.module.scss';
import { PositionColor } from '@/modules/competition/components/DialogCompetitionEdit/PositionColor';
import { Color } from '@/types/Color';
import { Channel } from '@/types/VTXChannel';
import { PositionChannel } from '@/modules/competition/components/DialogCompetitionEdit/PositionChannel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { IGate } from '@/types/IGate';
import { TableGates } from '@/modules/competition/components/DialogCompetitionEdit/TableGates';
import { TypeGate } from '@/types/TypeGate';
import AddIcon from '@mui/icons-material/Add';
import { DialogGateEdit } from '@/modules/competition/components/DIalogGateEdit/DialogGateEdit';
import {
    competitionDeleteAction,
    competitionInsertAction,
    competitionUpdateAction,
    competitionCloneAction
} from '@/actions/actionCompetitionRequest';
import { story } from '@/story/story';

interface IProps {
    open: boolean;
    onClose: () => void;
    competition?: ICompetition;
}
export const DialogCompetitionEdit: FC<IProps> = observer(({ open, onClose, competition }: IProps) => {
    const [tabSelected, setTabSelected] = useState('Data');
    const [description, setDescription] = useState<string>(competition?.description || '');
    const [name, setName] = useState<string>(competition?.name || '');
    const [selected, setSelected] = useState(competition?.selected || false);
    const [skipFirstGate, setSkipFirstGate] = useState(competition?.skipFirstGate || false);
    const [playFail, setPlayFail] = useState(competition?.playFail || false);
    const [logo, setLogo] = useState(competition?.logo || window.api.DEFAULT_COMPETITION_LOGO);
    const [latitude, setLatitude] = useState<number>(competition?.latitude || 0);
    const [longitude, setLongitude] = useState<number>(competition?.longitude || 0);
    const [radius, setRadius] = useState<number>(competition?.radius || 0);
    const [course, setCourse] = useState<number>(competition?.course || 0);
    const [delay, setDelay] = useState<number>(competition?.delay || 0);
    const [official1_title, setOfficial1_title] = useState<string>(competition?.official1_title || 'Race Timekeeper');
    const [official1_name, setOfficial1_name] = useState<string>(competition?.official1_name || '-');
    const [official2_title, setOfficial2_title] = useState<string>(competition?.official2_title || 'Race Director');
    const [official2_name, setOfficial2_name] = useState<string>(competition?.official2_name || '-');
    const [official3_title, setOfficial3_title] = useState<string>(competition?.official3_title || 'O.O.D.');
    const [official3_name, setOfficial3_name] = useState<string>(competition?.official3_name || '-');
    const [color1, setColor1] = useState<Color>(competition?.color1 || Color.BLUE);
    const [color2, setColor2] = useState<Color>(competition?.color2 || Color.RED);
    const [color3, setColor3] = useState<Color>(competition?.color3 || Color.GREEN);
    const [color4, setColor4] = useState<Color>(competition?.color4 || Color.YELLOW);
    const [color5, setColor5] = useState<Color>(competition?.color5 || Color.MAGENTA);
    const [color6, setColor6] = useState<Color>(competition?.color6 || Color.CYAN);
    const [color7, setColor7] = useState<Color>(competition?.color7 || Color.WHITE);
    const [color8, setColor8] = useState<Color>(competition?.color8 || Color.BLACK);
    const [channel1, setChannel1] = useState<Channel>(competition?.channel1 || Channel.R1);
    const [channel2, setChannel2] = useState<Channel>(competition?.channel2 || Channel.R2);
    const [channel3, setChannel3] = useState<Channel>(competition?.channel3 || Channel.R3);
    const [channel4, setChannel4] = useState<Channel>(competition?.channel4 || Channel.R4);
    const [channel5, setChannel5] = useState<Channel>(competition?.channel5 || Channel.R5);
    const [channel6, setChannel6] = useState<Channel>(competition?.channel6 || Channel.R6);
    const [channel7, setChannel7] = useState<Channel>(competition?.channel7 || Channel.R7);
    const [channel8, setChannel8] = useState<Channel>(competition?.channel8 || Channel.R8);
    const [openAddGate, setOpenAddGate] = useState(false);
    const [openEditGate, setOpenEditGate] = useState<IGate | undefined>(undefined);
    const [gates, setGates] = useState<Array<IGate>>(
        competition?.gates || [
            {
                _id: uuidv4(),
                type: TypeGate.FINISH,
                position: 1,
                delay: 10
            }
        ]
    );

    const inputFileRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleChangeTab = useCallback((event: React.SyntheticEvent, id: string) => {
        setTabSelected(id);
    }, []);

    const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const handleChangeLatitude = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setLatitude(Number(event.target.value));
    }, []);

    const handleChangeLongitude = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setLongitude(Number(event.target.value));
    }, []);

    const handleChangeRadius = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(Number(event.target.value));
    }, []);

    const handleChangeCourse = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setCourse(Number(event.target.value));
    }, []);

    const handleChangeDelay = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDelay(Number(event.target.value));
    }, []);

    const handleChangeOfficial1Title = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setOfficial1_title(event.target.value);
    }, []);

    const handleChangeOfficial2Title = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setOfficial2_title(event.target.value);
    }, []);

    const handleChangeOfficial3Title = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setOfficial3_title(event.target.value);
    }, []);

    const handleChangeOfficial1Name = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setOfficial1_name(event.target.value);
    }, []);

    const handleChangeOfficial2Name = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setOfficial2_name(event.target.value);
    }, []);

    const handleChangeOfficial3Name = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setOfficial3_name(event.target.value);
    }, []);

    const handleChangeSelected = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected((prev) => !prev);
    }, []);

    // const handleChangeSkipFirstGate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSkipFirstGate((prev) => !prev);
    // }, []);

    // const handleChangePlayFail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPlayFail((prev) => !prev);
    // }, []);

    const handleChangeLogo = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        if (inputFileRef.current && inputFileRef.current.files?.[0]?.path) {
            setLogo(await window.api.copyFile(inputFileRef.current.files?.[0]?.path));
        }
    }, []);

    const handleChangeDeletePhoto = useCallback(async () => {
        await window.api.deleteFile(logo).then(async () => {
            setLogo(window.api.DEFAULT_COMPETITION_LOGO);
            if (competition) {
                competitionUpdateAction(competition._id, { logo: window.api.DEFAULT_COMPETITION_LOGO });
            }
        });
    }, [competition, logo]);

    const handleOpenAddGate = useCallback(() => {
        setOpenAddGate(true);
    }, []);

    const handleOpenEditGate = useCallback(
        (id: string) => {
            const gate = _.find(gates, ['_id', id]);
            if (gate) {
                setOpenEditGate(gate);
            }
        },
        [gates]
    );

    const handleCloseGateEdit = useCallback(() => {
        setOpenAddGate(false);
        setOpenEditGate(undefined);
    }, []);

    const handleAddGate = useCallback(
        (gate: Omit<IGate, '_id'>) => {
            setGates([...gates, { ...gate, _id: uuidv4() }]);
            handleCloseGateEdit();
        },
        [gates, handleCloseGateEdit]
    );

    const handleUpdateGate = useCallback(
        (_id: string, gate: Omit<IGate, '_id'>) => {
            const arrGates = [...gates];
            var index = _.findIndex(arrGates, { _id });
            if (index >= 0) {
                arrGates.splice(index, 1, { ...gate, _id });
                setGates(arrGates);
                handleCloseGateEdit();
            }
        },
        [gates, handleCloseGateEdit]
    );

    const handleDeleteGate = useCallback(
        (id: string) => {
            if (window.confirm('Are you sure you want to delete the gate?')) {
                setGates((gates || []).filter((gate) => gate._id !== id));
                handleCloseGateEdit();
            }
        },
        [gates, handleCloseGateEdit]
    );

    const handleSave = useCallback(() => {
        if (name) {
            // console.log(latitude, longitude, radius, course);
            const newValue = {
                name,
                description,
                logo,
                selected,
                official1_title,
                official1_name,
                official2_title,
                official2_name,
                official3_title,
                official3_name,
                latitude,
                longitude,
                radius,
                course,
                delay,
                // deprecated
                skipFirstGate,
                playFail,
                gates: _.cloneDeep(gates),
                color1,
                color2,
                color3,
                color4,
                color5,
                color6,
                color7,
                color8,
                channel1,
                channel2,
                channel3,
                channel4,
                channel5,
                channel6,
                channel7,
                channel8
            };
            // console.log(newValue);
            if (competition) {
                competitionUpdateAction(competition._id, newValue);
            } else {
                competitionInsertAction(newValue);
            }

            // TODO 8) При событии изменения конфига трассы отправить команду Config на базу автоматически
            let devices: (number | undefined)[] = [];
            for (let j = 0; j < story.groups.length; j++) {
                const g = story.groups[j];
                for (let i = 0; i < g.sportsmen.length; i++) {
                    if (g.sportsmen[i] !== undefined) {
                        if (g.sportsmen[i].sportsman !== undefined) {
                            if (g.sportsmen[i].sportsman?.transponders[0] !== undefined) {
                                let id = g.sportsmen[i].sportsman?.transponders[0];
                                if (!devices.includes(id)) {
                                    devices.push(id);
                                }
                            }
                        }
                    }
                }
            }
            window.api.ipcRenderer.send(
                'MXAction',
                '',
                'config',
                devices,
                story.competition?.latitude,
                story.competition?.longitude,
                story.competition?.radius,
                story.competition?.course,
                story.competition?.delay
            );

            onClose();
        }
    }, [
        channel1,
        channel2,
        channel3,
        channel4,
        channel5,
        channel6,
        channel7,
        channel8,
        color1,
        color2,
        color3,
        color4,
        color5,
        color6,
        color7,
        color8,
        gates,
        competition,
        logo,
        name,
        description,
        official1_title,
        official1_name,
        official2_title,
        official2_name,
        official3_title,
        official3_name,
        latitude,
        longitude,
        radius,
        course,
        delay,
        onClose,
        selected,
        skipFirstGate,
        playFail
    ]);

    const handleDelete = useCallback(() => {
        if (
            competition &&
            window.confirm(
                'Are you sure you want to delete the competition? All sportsmen and groups and laps will be deleted with him!'
            )
        ) {
            competitionDeleteAction(competition._id);
            onClose();
        }
    }, [competition, onClose]);

    const handleClone = useCallback(() => {
        if (competition && window.confirm('Are you sure you want to clone the competition?')) {
            competitionCloneAction(competition._id);
            onClose();
        }
    }, [competition, onClose]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{competition ? 'Edit' : 'New'} competition</DialogTitle>
            <DialogContent>
                <Box sx={{ width: '500px' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="scrollable" scrollButtons="auto" value={tabSelected} onChange={handleChangeTab}>
                            <Tab label="Data" value="Data" id="Data" />
                            <Tab label="Track" value="Track" id="Track" />
                            <Tab label="Officials" value="Officials" id="Officials" />
                            {/*<Tab label="Gates" value="Gates" id="Gates" />*/}
                            {/*<Tab label="Channels" value="Channels" id="Channels" />*/}
                            {/*<Tab label="Colors" value="Colors" id="Colors" />*/}
                        </Tabs>
                    </Box>
                    <div hidden={tabSelected !== 'Data'} className={styles.tabPanel}>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
                            <TextField
                                id="outlined-basic"
                                label="Name competition"
                                fullWidth
                                variant="outlined"
                                value={name}
                                error={!name}
                                onChange={handleChangeName}
                            />
                            <div className={styles.logoBlock}>
                                <div>
                                    {!!logo && logo !== window.api.DEFAULT_COMPETITION_LOGO && (
                                        <CancelOutlinedIcon
                                            className={styles.deleteLogo}
                                            onClick={handleChangeDeletePhoto}
                                        />
                                    )}
                                    <img
                                        ref={imageRef}
                                        src={window.api.getFilePath(logo || window.api.DEFAULT_COMPETITION_LOGO)}
                                        alt="logo"
                                    />
                                    <Button variant="contained" component="label">
                                        Select logo
                                        <input
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            ref={inputFileRef}
                                            hidden
                                            onChange={handleChangeLogo}
                                        />
                                    </Button>
                                </div>
                            </div>
                            <FormControlLabel
                                control={<Switch checked={selected} onChange={handleChangeSelected} />}
                                label="Select this competition"
                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Switch checked={skipFirstGate} onChange={handleChangeSkipFirstGate} />}*/}
                            {/*    label="Skip the first gate"*/}
                            {/*/>*/}
                            {/*<FormControlLabel*/}
                            {/*    control={<Switch checked={playFail} onChange={handleChangePlayFail} />}*/}
                            {/*    label="Play a violation sound"*/}
                            {/*/>*/}
                        </Box>
                    </div>
                    <div hidden={tabSelected !== 'Track'} className={styles.tabPanel}>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
                            <TextField
                                id="outlined-basic"
                                label="Start latitude"
                                // helperText="Start latitude"
                                type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="5537362"
                                value={latitude}
                                error={!latitude}
                                onChange={handleChangeLatitude}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Start longitude"
                                // helperText="Start longitude"
                                type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="2531864"
                                value={longitude}
                                error={!longitude}
                                onChange={handleChangeLongitude}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Start radius (1 - 100 meters)"
                                // helperText="Min 0 Max 100"
                                type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="10"
                                value={radius}
                                error={radius < 1 || radius > 100}
                                onChange={handleChangeRadius}
                                // InputProps={{ startAdornment: <InputAdornment position="start">m</InputAdornment> }}
                                InputProps={{ endAdornment: <InputAdornment position="start">m</InputAdornment> }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Start course (0 - 360 degrees)"
                                // helperText="Min 0 Max 360"
                                type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="0"
                                value={course}
                                error={course < 0 || course > 360}
                                onChange={handleChangeCourse}
                                InputProps={{ endAdornment: <InputAdornment position="start">°</InputAdornment> }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Minimum lap time (0 - 255 seconds)"
                                // helperText="Min 0 Max 255"
                                type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="10"
                                value={delay}
                                error={delay < 0 || delay > 255}
                                onChange={handleChangeDelay}
                                InputProps={{ endAdornment: <InputAdornment position="start">s</InputAdornment> }}
                            />
                        </Box>
                    </div>
                    <div hidden={tabSelected !== 'Officials'} className={styles.tabPanel}>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
                            <TextField
                                id="outlined-basic"
                                label="Official 1 title"
                                // helperText="Start latitude"
                                // type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="Official 1 title"
                                value={official1_title}
                                error={!official1_title}
                                onChange={handleChangeOfficial1Title}
                            />
                            <TextField
                                id="outlined-basic"
                                label={official1_title}
                                // helperText="Start latitude"
                                // type="number"
                                fullWidth
                                variant="outlined"
                                placeholder={official1_title}
                                value={official1_name}
                                error={!official1_name}
                                onChange={handleChangeOfficial1Name}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Official 2 title"
                                // helperText="Start latitude"
                                // type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="Official 2 title"
                                value={official2_title}
                                error={!official2_title}
                                onChange={handleChangeOfficial2Title}
                            />
                            <TextField
                                id="outlined-basic"
                                label={official2_title}
                                // helperText="Start latitude"
                                // type="number"
                                fullWidth
                                variant="outlined"
                                placeholder={official2_title}
                                value={official2_name}
                                error={!official2_name}
                                onChange={handleChangeOfficial2Name}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Official 3 title"
                                // helperText="Start latitude"
                                // type="number"
                                fullWidth
                                variant="outlined"
                                placeholder="Official 3 title"
                                value={official3_title}
                                error={!official3_title}
                                onChange={handleChangeOfficial3Title}
                            />
                            <TextField
                                id="outlined-basic"
                                label={official3_title}
                                // helperText="Start latitude"
                                // type="number"
                                fullWidth
                                variant="outlined"
                                placeholder={official3_title}
                                value={official3_name}
                                error={!official3_name}
                                onChange={handleChangeOfficial3Name}
                            />
                        </Box>
                    </div>
                    <div hidden={tabSelected !== 'Gates'} className={styles.tabPanel}>
                        <div className={styles.actions}>
                            <Button color="primary" startIcon={<AddIcon />} onClick={handleOpenAddGate}>
                                Add gate
                            </Button>
                        </div>
                        <TableGates gates={gates} onUpdate={handleOpenEditGate} onDelete={handleDeleteGate} />
                        {(!!openEditGate || openAddGate) && (
                            <DialogGateEdit
                                gate={openEditGate}
                                gates={gates}
                                onDelete={handleDeleteGate}
                                onUpdate={handleUpdateGate}
                                onSave={handleAddGate}
                                onClose={handleCloseGateEdit}
                                open={!!openEditGate || openAddGate}
                            />
                        )}
                    </div>
                    <div hidden={tabSelected !== 'Channels'} className={styles.tabPanel}>
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 } }} noValidate autoComplete="off">
                            <PositionChannel label="Position 1" value={channel1} onChange={setChannel1} />
                            <PositionChannel label="Position 2" value={channel2} onChange={setChannel2} />
                            <PositionChannel label="Position 3" value={channel3} onChange={setChannel3} />
                            <PositionChannel label="Position 4" value={channel4} onChange={setChannel4} />
                            <PositionChannel label="Position 5" value={channel5} onChange={setChannel5} />
                            <PositionChannel label="Position 6" value={channel6} onChange={setChannel6} />
                            <PositionChannel label="Position 7" value={channel7} onChange={setChannel7} />
                            <PositionChannel label="Position 8" value={channel8} onChange={setChannel8} />
                        </Box>
                    </div>
                    <div hidden={tabSelected !== 'Colors'} className={styles.tabPanel}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <PositionColor label="Position 1" value={color1} onChange={setColor1} />
                            <PositionColor label="Position 2" value={color2} onChange={setColor2} />
                            <PositionColor label="Position 3" value={color3} onChange={setColor3} />
                            <PositionColor label="Position 4" value={color4} onChange={setColor4} />
                            <PositionColor label="Position 5" value={color5} onChange={setColor5} />
                            <PositionColor label="Position 6" value={color6} onChange={setColor6} />
                            <PositionColor label="Position 7" value={color7} onChange={setColor7} />
                            <PositionColor label="Position 8" value={color8} onChange={setColor8} />
                        </Box>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                {!!competition && (
                    <Button onClick={handleDelete} style={{ marginRight: 'auto' }} color="error">
                        Delete
                    </Button>
                )}
                {!!competition && (
                    <Button onClick={handleClone} color="success">
                        Clone
                    </Button>
                )}
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleSave} disabled={!name}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
});
