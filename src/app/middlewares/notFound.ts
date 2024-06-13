import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, nex: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    massage: 'API Not Found!!',
    error: '',
  });
};

export default notFound;
