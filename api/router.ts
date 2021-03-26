import express from 'express';

const router = express.Router();

import contacts from './routes/contacts';
import addresses from './routes/addresses';
import phones from './routes/phones';
import emails from './routes/emails';

router.use('/contacts', contacts);
router.use('/addresses', addresses);
router.use('/phones', phones);
router.use('/emails', emails);

export default router;
