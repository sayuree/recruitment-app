import { EventEmitter } from 'events';

const jobApplicationSubmittedEvent = new EventEmitter();

jobApplicationSubmittedEvent.on('new-application', (application) => {
  console.log(
    `New job application received for job posting ${application.title}`,
  );
  console.log(`Notification sent to recruiter`);
});

export default jobApplicationSubmittedEvent;
