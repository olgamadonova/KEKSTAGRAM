//делу время

const normalizeTime = (time) => time.split(':').map((timeElement) => timeElement.padStart(2, '0'));

const validateInput = (...strings) => strings.every((str) => typeof str === 'string');

const isOverTime = (startWorkingDay, endWorkingDay, startMeeting, meetingDuration) => {
  if(! validateInput(startWorkingDay, endWorkingDay, startMeeting)){
    return null;
  }

  const [hoursStartWorking, ] = normalizeTime(startWorkingDay);
  const [hoursEndWorking, minutesEndWorking] = normalizeTime(endWorkingDay);
  const [hoursStartMeeting, minutesStartMeeting] = normalizeTime(startMeeting);

  if (+hoursStartWorking > +hoursStartMeeting || +hoursStartMeeting > +hoursEndWorking) {
    return false;
  }

  const hoursLeft = hoursEndWorking - hoursStartMeeting;
  const minutesLeft = minutesEndWorking - minutesStartMeeting;
  const totalMinutesLeft = minutesLeft + hoursLeft * 60;

  return meetingDuration <= totalMinutesLeft;
};

isOverTime('08:00', '17:30', '14:00', 90); //true
isOverTime('8:0', '10:0', '8:0', 120); //true
isOverTime('08:00', '14:30', '14:00', 90); //false
isOverTime('14:00', '17:30', '08:0', 90); //false
isOverTime('8:00', '17:30', '08:00', 900); //false
