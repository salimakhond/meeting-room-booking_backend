import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

const test = async (req: Request, res: Response) => {
  const a = "Hello I'm Meeting Room Booking System";
  res.send(a);
};

app.get('/', test);

// global error
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
