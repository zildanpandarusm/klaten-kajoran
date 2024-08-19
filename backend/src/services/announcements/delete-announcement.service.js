import { google } from 'googleapis';
import { findOneAnnouncement, deleteAnnouncement } from '../../repositories/announcement.repository.js';
import dotenv from 'dotenv';

dotenv.config();

const SCOPE = ['https://www.googleapis.com/auth/drive.file'];

async function authorize() {
  const jwtClient = new google.auth.JWT(process.env.GOOGLE_CLOUD_CLIENT_EMAIL, null, process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'), SCOPE);
  await jwtClient.authorize();
  return jwtClient;
}

async function deleteFile(authClient, fileId) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    drive.files.delete({ fileId: fileId }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
}

export const deleteAnnouncementService = async (id) => {
  const announcement = await findOneAnnouncement(id);

  if (!announcement) {
    throw new Error('Announcement not found');
  }

  const authClient = await authorize();
  await deleteFile(authClient, announcement.fileId);

  let deletedAnnouncement = await deleteAnnouncement(id);

  return {
    result: deletedAnnouncement,
  };
};
