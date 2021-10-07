import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import type {EventData} from '@modules/Schedule/types';
import {Dialog as _Dialog} from '@mui/material';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import 'react-calendar/dist/Calendar.css';

type StateTypes = 'add' | 'edit' | 'delete';

interface Props {
  visible: boolean
  handleClose: () => void
  state: StateTypes
};

const Dialog: React.FC<Props> = ({visible, handleClose, state}) => {
  const [
    _scheduleList,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  ] = useSchedule();

  const addEvents = (event: EventData) => {
    createSchedule(event);
  };
  const editEvents = (event: EventData) => {
    updateSchedule(event);
  };
  const deleteEvents = (id: string) => {
    deleteSchedule(id);
  };

  return (
    <_Dialog
      open={visible}
      onClose={handleClose}
    >
      {
        state === 'add' ?
        <AddModal handleClose={handleClose} handleSubmit={addEvents}/> :
        state === 'edit' ?
        <EditModal handleClose={handleClose} handleSubmit={editEvents}/> :
        <DeleteModal handleClose={handleClose} handleSubmit={deleteEvents}/>
      }
    </_Dialog>
  );
};

export default Dialog;
