import { NextResponse } from 'next/server';
import officeData from '@/data/offices.json';

export function GET() {
  return NextResponse.json(officeData);
}