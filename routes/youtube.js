import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();

/* GET home page. */
router.get('/', async (req, res) => {
  const countryCode = req.query.countryCode;
  const trends = await service.getTrendingVideos(countryCode);
  res.render('youtube/index', {
    title: config.title, // app title
    videos: trends, // vidoes that get binding in the index page
    countryList: config.countryList, // country list coming from config object in config.json
    selectedCountry: countryCode || "AF" // in absense of country code parameter, country code defaulted to AF. Afganistan becomes the country for 1st load
  });
});

router.get('/:videoId', async (req, res) => {
  const countryCode = req.query.countryCode;
  res.render('youtube/player', {
    title: config.title,
    videoId: req.params.videoId,
    countryList: config.countryList,
    selectedCountry: countryCode || "AF" // Selected country for the details page, defaulted to AF.
  });
});

module.exports = router;
