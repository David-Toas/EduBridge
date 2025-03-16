import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrimarySubjectsList = () => {
  // Sample data for primary level subjects
  const subjects = [
    { name: "Mathematics", topics: 15 },
    { name: "English", topics: 12 },
    { name: "Science", topics: 10 },
    { name: "Social Studies", topics: 8 },
    { name: "Art", topics: 6 },
    { name: "Physical Education", topics: 5 },
    { name: "Music", topics: 4 },
    { name: "Computer Studies", topics: 7 }
  ];

  return (
    <Card className="w-full max-w-full mx-auto rounded-md shadow-lg">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-center text-2xl font-bold text-blue-800">
          Primary Level Subjects
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4">
          {subjects.map((subject) => (
            <div 
              key={subject.name} 
              className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="font-medium text-lg">{subject.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{subject.topics} topics</span>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrimarySubjectsList;