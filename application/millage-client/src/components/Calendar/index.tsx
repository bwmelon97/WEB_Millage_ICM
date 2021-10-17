import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import FullCalendar, {
  CustomButtonInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Dialog from './Dialog';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [isShow, setIsShow] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [scheduleList] = useSchedule();

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  React.useEffect(() => {
    console.log(scheduleList);
  }, [scheduleList]);

  const addEvents: CustomButtonInput = {
    text: '추가',
    click: () => {
      setState('add');
      handleOpen();
    },
  };
  const editEvents: CustomButtonInput = {
    text: '편집',
    click: () => {
      setState('edit');
      handleOpen();
    },
  };
  const deleteEvents: CustomButtonInput = {
    text: '삭제',
    click: () => {
      setState('delete');
      handleOpen();
    },
  };
  const toggleEvents: CustomButtonInput = {
    text: isShow ? '개인' : '전체',
    click: () => {
      setIsShow((e) => !e);
    },
  };

  return (
    <div className='calendar-wrapper'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        locale='ko'
        timeZone='ko'
        allDaySlot={false}
        nowIndicator
        aspectRatio={0.8}
        dayCellContent={({date}) => date.getDate()}
        views={{
          timeGrid: {
            dayHeaderFormat: {
              day: 'numeric',
            },
            dayHeaderClassNames: 'fc-time-grid-day-header',
          },
        }}
        weekNumbers
        weekNumberContent={(week) => `${week.num}주`}
        headerToolbar={{
          start: 'title prev,next today dayGridMonth,timeGridWeek',
          end: 'toggleEvents',
        }}
        footerToolbar={{
          end: 'addEvents,editEvents,deleteEvents',
        }}
        buttonText={{
          today: '오늘',
          month: '월간',
          week: '주간',
        }}
        events={scheduleList
            .filter(({groupId}) => isShow ? true : groupId === 'person')
            .map((schedule) => ({
              ...schedule,
              color: schedule.groupId === 'person' ? '#FFA000' : '#388E3C',
            }))
        }
        fixedWeekCount={false}
        customButtons={{
          addEvents,
          editEvents,
          deleteEvents,
          toggleEvents,
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
          hour12: false,
        }}
      />
      <Dialog
        visible={visible}
        handleClose={handleClose}
        state={state}
      />
    </div>
  );
};

export default Calendar;
