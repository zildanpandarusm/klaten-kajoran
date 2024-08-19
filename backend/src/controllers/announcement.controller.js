import { createAnnouncementService } from '../services/announcements/create-announcement.service.js';
import { deleteAnnouncementService } from '../services/announcements/delete-announcement.service.js';
import { getOneAnnouncementService } from '../services/announcements/get-one-announcement.service.js';
import { getAnnouncementService } from '../services/announcements/get-announcement.service.js';
import { updateAnnouncementService } from '../services/announcements/update-announcement.service.js';

const getAnnouncement = async (req, res, next) => {
  try {
    const result = await getAnnouncementService();

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getOneAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneAnnouncementService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const { body, file } = req;
    const result = await createAnnouncementService(body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const { body, file } = req;
    const { id } = req.params;
    const result = await updateAnnouncementService(id, body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAnnouncementService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

export { getAnnouncement, getOneAnnouncement, createAnnouncement, updateAnnouncement, deleteAnnouncement };
