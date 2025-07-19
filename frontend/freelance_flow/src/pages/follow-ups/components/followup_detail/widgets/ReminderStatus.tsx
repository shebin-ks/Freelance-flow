import React from 'react';
import { Clock } from 'lucide-react';
import type { Reminder } from '../../../../../redux/features/reminders/types';
import { differenceInDays, formatDistanceToNow } from 'date-fns';



const ReminderStatus: React.FC<{ reminder: Reminder }> = ({ reminder }) => {
  const reminderDate = new Date(reminder.reminderAt);
  const now = new Date();

  const isCompleted = reminder.isCompleted;
  const isOverdue = !isCompleted && reminderDate < now;
  const daysDifference = differenceInDays(now, reminderDate);

  const timeUntil = !isCompleted && reminderDate > now
    ? formatDistanceToNow(reminderDate, { addSuffix: true })
    : null;
  if (!isCompleted && isOverdue) {
    return (
      <>
        <Clock className="ml-10 w-4 h-4 text-red-600" />
        <span className="ml-1.5 text-sm font-medium text-red-600">
          {daysDifference} day{daysDifference > 1 ? 's' : ''} overdue
        </span>
      </>
    );
  }

  if (!isCompleted && !isOverdue && timeUntil) {
    return (
      <>
        <Clock className="ml-10 w-4 h-4 text-blue-600" />
        <span className="ml-1.5 text-sm font-medium text-blue-600">{timeUntil}</span>
      </>
    );
  }

  if (isCompleted) {
    return (
      <span className="ml-10 text-sm font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
        Completed
      </span>
    );
  }

  return null;
};

export default ReminderStatus;
