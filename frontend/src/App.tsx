import { useState } from 'react';
import type { PageId } from './types';
import { Layout } from './components/Layout';

import { Dashboard } from './pages/Dashboard';
import { SinglePrediction } from './pages/SinglePrediction';
import { BatchPrediction } from './pages/BatchPrediction';
import { AttentionVisualization } from './pages/AttentionVisualization';
import { HowAttentionWorks } from './pages/HowAttentionWorks';
import { DatasetPage } from './pages/DatasetPage';
import { TrainingPage } from './pages/TrainingPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { ModelComparisonPage } from './pages/ModelComparisonPage';
import { LiteratureSurveyPage } from './pages/LiteratureSurveyPage';
import { ResearchGapPage } from './pages/ResearchGapPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { AdvantagesLimitationsPage } from './pages/AdvantagesLimitationsPage';
import { ProjectArchitecturePage } from './pages/ProjectArchitecturePage';
import { PPTContentPage } from './pages/PPTContentPage';
import { ProjectReportPage } from './pages/ProjectReportPage';
import { VivaQuestionsPage } from './pages/VivaQuestionsPage';
import { DocumentationPage } from './pages/DocumentationPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'single-prediction':
        return <SinglePrediction />;
      case 'batch-prediction':
        return <BatchPrediction />;
      case 'attention-visualization':
        return <AttentionVisualization />;
      case 'how-attention-works':
        return <HowAttentionWorks />;
      case 'dataset':
        return <DatasetPage />;
      case 'training':
        return <TrainingPage />;
      case 'evaluation':
        return <EvaluationPage />;
      case 'model-comparison':
        return <ModelComparisonPage />;
      case 'literature-survey':
        return <LiteratureSurveyPage />;
      case 'research-gap':
        return <ResearchGapPage />;
      case 'case-study':
        return <CaseStudyPage />;
      case 'applications':
        return <ApplicationsPage />;
      case 'advantages-limitations':
        return <AdvantagesLimitationsPage />;
      case 'project-architecture':
        return <ProjectArchitecturePage />;
      case 'ppt-content':
        return <PPTContentPage />;
      case 'project-report':
        return <ProjectReportPage />;
      case 'viva-questions':
        return <VivaQuestionsPage />;
      case 'documentation':
        return <DocumentationPage />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;
