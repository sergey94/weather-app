import React from 'react';
import dayjs from 'dayjs';

const Timezone = ({offsetInSeconds}) => {
  if(typeof(offsetInSeconds) === 'number') {
    return dayjs().add(dayjs().utcOffset() * 60 - offsetInSeconds, 'seconds').format('HH:mm');
  }
  return '-';
}

export default Timezone;
