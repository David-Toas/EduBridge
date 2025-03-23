/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface Course {
  id: string;
  title: string;
  description: string;
  // Add other properties as needed
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  // Add other properties as needed
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  // Add other properties as needed
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  moduleId: string;
  // Add other properties as needed
}

interface Module {
  id: string;
  title: string;
  courseId: string;
  // Add other properties as needed
}

interface Data {
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  users: User[];
  enrollments: Enrollment[];
}

export const useDataFetch = (token: string | null) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const results = await Promise.allSettled([
          axios.get(`${baseURL}/course/all`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseURL}/module/all`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseURL}/lesson/all`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseURL}/user/all`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseURL}/enrollment/all`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const processedData = {
          courses: results[0].status === "fulfilled" ? results[0].value.data.data : [],
          modules: results[1].status === "fulfilled" ? results[1].value.data.data : [],
          lessons: results[2].status === "fulfilled" ? results[2].value.data.data : [],
          users: results[3].status === "fulfilled" ? results[3].value.data.data : [],
          enrollments: results[4].status === "fulfilled" ? results[4].value.data.data : [],
        };

        setData(processedData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loading, error };
};