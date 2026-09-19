import React from 'react';
import { CareerRoadmap } from '../../types/career';
import { CheckCircle2, Clock, BookOpen, Flag } from 'lucide-react';

interface RoadmapTimelineProps {
  roadmap: CareerRoadmap;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ roadmap }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
      <h3 className="text-xl font-bold text-gray-900 mb-8">Career Roadmap</h3>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:to-gray-200">
        {roadmap.milestones.map((milestone) => {
          const isComplete = milestone.progress === 100;
          const isInProgress = milestone.progress > 0 && milestone.progress < 100;
          
          return (
            <div key={milestone.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {isComplete ? <CheckCircle2 size={20} className="text-green-600" /> : <span className="text-xs font-bold">{milestone.day}d</span>}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900 text-lg">{milestone.skill}</h4>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    <Clock size={12} /> Day {milestone.day}
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-2">
                    <BookOpen size={16} className="text-blue-500 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700 block text-xs uppercase tracking-wider mb-0.5">Resource</span>
                      <span className="text-gray-600">{milestone.learningResource}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Flag size={16} className="text-purple-500 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700 block text-xs uppercase tracking-wider mb-0.5">Project</span>
                      <span className="text-gray-600">{milestone.project}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="font-semibold text-gray-700 block text-xs uppercase tracking-wider mb-1">Expected Outcome</span>
                    <p className="text-sm text-gray-600">{milestone.expectedOutcome}</p>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span className={isComplete ? 'text-green-600' : isInProgress ? 'text-blue-600' : 'text-gray-400'}>
                        {isComplete ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                      </span>
                      <span className="text-gray-600">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
