'use server';
 
import { redirect } from 'next/navigation'
 
const navigate = async (url) => {
  redirect(url)
}

export {navigate};