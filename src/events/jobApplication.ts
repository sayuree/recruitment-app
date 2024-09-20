import { EventEmitter } from 'events';
import { Recruiter } from '../entity/Recruiter';

const jobApplicationSubmittedEvent = new EventEmitter();

jobApplicationSubmittedEvent.on(
  'new-application',
  (application: { title: string; recruiter: Recruiter }) => {
    const emailData = {
      recipient: application.recruiter.email,
      subject: 'New job application',
      content: `Dear, <b> ${application.recruiter.first_name}</b>! <br><br> You have received new job application for job posting with title ${application.title}`,
    };

    console.log(`Sending email to ${application.recruiter.email}`);
    console.log(emailData);
    console.log(
      `Notification sent to recruiter  ${application.recruiter.first_name} ${application.recruiter.last_name}`,
    );
  },
);

export default jobApplicationSubmittedEvent;
