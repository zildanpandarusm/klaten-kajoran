import fs from 'fs';
import { google } from 'googleapis';
import { createAnnouncement } from '../../repositories/announcement.repository.js';
import dotenv from 'dotenv';

dotenv.config();

const SCOPE = ['https://www.googleapis.com/auth/drive.file'];

async function authorize() {
  const jwtClient = new google.auth.JWT(process.env.GOOGLE_CLOUD_CLIENT_EMAIL, null, process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'), SCOPE);
  await jwtClient.authorize();
  return jwtClient;
}

async function uploadFile(authClient, filePath, fileName) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const fileMetaData = {
      name: fileName,
      parents: ['16rLlJxcj5LaILvJWXArenvp39JvGXXCD'],
    };
    const media = {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    };

    drive.files.create(
      {
        resource: fileMetaData,
        media: media,
        fields: 'id, webViewLink, webContentLink',
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        resolve(file.data);
      }
    );
  });
}

function convertToPreviewUrl(webViewLink) {
  return webViewLink.replace('/view?usp=drivesdk', '/preview').replace('/view', '/preview');
}

export const createAnnouncementService = async (data, file) => {
  if (!file) {
    throw new Error('File not provided');
  }

  if (file.mimetype !== 'application/pdf') {
    throw new Error('Only PDF files are allowed');
  }

  const authClient = await authorize();
  const uploadedFile = await uploadFile(authClient, file.path, file.originalname);

  const previewUrl = convertToPreviewUrl(uploadedFile.webViewLink);

  const announcement = {
    title: data.title,
    fileUrl: previewUrl,
    fileId: uploadedFile.id,
    desc: data.desc,
    date: new Date(),
  };

  let createdAnnouncement = await createAnnouncement(announcement);

  return {
    fileUrl: previewUrl,
    result: createdAnnouncement,
  };
};
