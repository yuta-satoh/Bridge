// 使わなくなったのでテストしません
import type { NextApiRequest, NextApiResponse } from 'next';
import { useEffect, useState } from 'react';

type Data = string

type GuestCartType = {
  itemId: number;
  quantity: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const storageData = localStorage.getItem('GuestCart');

  const total = JSON.stringify(storageData);

  res.status(200).json(total);
}
