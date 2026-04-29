'use client';

import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// BRAND COLORS - Southern Stock Fence (Exact Brand Palette)
// ============================================================================

const COLORS = {
  primaryBrown: '#5a3a2a',    // Logo, headlines, accents
  darkBrown: '#3b261c',       // Deep accents, dark text
  creamBg: '#fdfbf7',         // Page background (LIGHTER than cards)
  cardBg: '#f7f1ea',          // Card backgrounds (slightly darker than page)
  warmTan: '#d8b98a',         // Borders, dividers
  mutedGold: '#c9973f',       // Primary accent, donut chart (PRIORITY)
  mutedGreen: '#6f7d4f',      // Secondary accent, donut chart (PRIORITY)
  rustAccent: '#b7653f',      // Tertiary accent, donut chart
  softBorder: '#ead8c5',      // Card borders, shadows
};

// Section colors - prioritizing main brand colors (gold, green, brown)
const SECTION_COLORS = [
  '#c9973f', // Execution Schedule - Muted Gold (PRIMARY)
  '#b7653f', // Phases - Rust Accent
  '#6f7d4f', // Website Pages - Muted Green (PRIORITY)
  '#c9973f', // GBP - Muted Gold
  '#b8956a', // Citations - Tan
  '#6f7d4f', // Content - Muted Green
  '#b7653f', // Reviews - Rust Accent
  '#a87c5c', // Social Media - Warm Brown
  '#c9973f', // Job Content - Muted Gold
  '#6f7d4f', // Internal Linking - Muted Green
  '#b7653f', // AI SEO - Rust Accent
  '#a67c52', // Conversion Optimization - Brown Tan
];

// ============================================================================
// CSV URLS
// ============================================================================

const CSV_URLS = {
  executionSchedule: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=509858601&single=true&output=csv',
  phases: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=4966251&single=true&output=csv',
  websitePages: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=671319450&single=true&output=csv',
  gbp: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=777816140&single=true&output=csv',
  citations: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=825880036&single=true&output=csv',
  content: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=1727652133&single=true&output=csv',
  reviews: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=58565512&single=true&output=csv',
  socialMedia: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=687601853&single=true&output=csv',
  jobContent: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=1506353359&single=true&output=csv',
  internalLinking: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=1457015641&single=true&output=csv',
  aiSeo: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=535189927&single=true&output=csv',
  conversionOptimization: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTRWYQYFy6K_d8VeiYBfdTzDszcxh5L76xUekVj3BDhrMtpz1crCN2ZoPD6GJHehl5t3Q6KWgYA1fV/pub?gid=354997778&single=true&output=csv',
};

// Sheet tab direct URLs (for "Open Sheet Tab" buttons)
const SHEET_TAB_URLS = {
  executionSchedule: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=509858601#gid=509858601',
  phases: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=4966251#gid=4966251',
  websitePages: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=671319450#gid=671319450',
  gbp: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=777816140#gid=777816140',
  citations: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=825880036#gid=825880036',
  content: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=1727652133#gid=1727652133',
  reviews: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=58565512#gid=58565512',
  socialMedia: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=687601853#gid=687601853',
  jobContent: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=1506353359#gid=1506353359',
  internalLinking: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=1457015641#gid=1457015641',
  aiSeo: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=535189927#gid=535189927',
  conversionOptimization: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?gid=354997778#gid=354997778',
};

// Quick action links
const QUICK_LINKS = {
  squarespace: 'https://squarespace.com',
  gbp: 'https://business.google.com/en-all/business-profile/',
  googleSheet: 'https://docs.google.com/spreadsheets/d/1O7vFZiGfLZKb600bteDk7k3lmAqPBeKF9h_CYNgzWMs/edit?usp=sharing',
};

// ============================================================================
// TYPES
// ============================================================================

interface Task {
  [key: string]: string;
}

interface SectionData {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
  primaryField: string; // Main field to display as task name
  statusField: string;
  priorityField?: string;
}

// ============================================================================
// CSV PARSER
// ============================================================================

function parseCSV(csvText: string): Task[] {
  const lines = csvText.trim().split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map((line) => {
    const values = line.split(',').map(v => v.trim());
    const row: Task = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    return row;
  }).filter(row => {
    // Filter out empty rows
    return Object.values(row).some(val => val !== '');
  });
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusStyles: Record<string, { bg: string; text: string }> = {
    'Done': { bg: '#d4edda', text: '#155724' },
    'In Progress': { bg: '#fff3cd', text: '#856404' },
    'Not Started': { bg: '#e7e7e7', text: '#383838' },
  };

  const style = statusStyles[status] || statusStyles['Not Started'];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600',
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {status}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  if (!priority) return null;
  
  const priorityStyles: Record<string, { bg: string; text: string }> = {
    'High': { bg: '#ffe6e6', text: '#c41e3a' },
    'Medium': { bg: '#fff0e6', text: '#cc7a00' },
    'Low': { bg: '#f0f0f0', text: '#666666' },
  };

  const style = priorityStyles[priority] || priorityStyles['Low'];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '8px',
        fontSize: '10px',
        fontWeight: '600',
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {priority}
    </span>
  );
};

// ============================================================================
// DONUT CHART COMPONENT
// ============================================================================

const DonutChart: React.FC<{ 
  title: string; 
  sections: SectionData[];
  phaseFilter?: number; // 1, 2, 3, or undefined for all
}> = ({ title, sections, phaseFilter }) => {
  const chartSize = 160;
  const radius = chartSize / 2 - 15;
  const innerRadius = radius * 0.65;

  // Filter tasks by phase if specified
  const filteredSections = sections.map(section => {
    if (!phaseFilter) return section;
    
    // Phase filtering logic based on section
    const phaseTasks = section.tasks.filter(task => {
      const phaseValue = task['Phase'];
      if (phaseValue && phaseValue.includes(`Phase ${phaseFilter}`)) {
        return true;
      }
      return false;
    });
    
    return { ...section, tasks: phaseTasks };
  });

  // Calculate totals
  const totalTasks = filteredSections.reduce((sum, s) => sum + s.tasks.length, 0);
  const completedTasks = filteredSections.reduce((sum, s) => {
    return sum + s.tasks.filter(t => t[s.statusField] === 'Done').length;
  }, 0);

  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Create segments
  const sectionData = filteredSections.map(section => {
    const total = section.tasks.length;
    const completed = section.tasks.filter(t => t[section.statusField] === 'Done').length;
    return {
      ...section,
      total,
      completed,
      percent: total > 0 ? (completed / total) * 100 : 0,
    };
  }).filter(s => s.total > 0); // Only show sections with tasks

  let currentAngle = -90;
  const segments = sectionData.map((section) => {
    const sliceAngle = (section.total / totalTasks) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = chartSize / 2 + radius * Math.cos(startRad);
    const y1 = chartSize / 2 + radius * Math.sin(startRad);
    const x2 = chartSize / 2 + radius * Math.cos(endRad);
    const y2 = chartSize / 2 + radius * Math.sin(endRad);

    const ix1 = chartSize / 2 + innerRadius * Math.cos(startRad);
    const iy1 = chartSize / 2 + innerRadius * Math.sin(startRad);
    const ix2 = chartSize / 2 + innerRadius * Math.cos(endRad);
    const iy2 = chartSize / 2 + innerRadius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const path = `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;

    currentAngle = endAngle;

    return {
      path,
      color: section.color,
      name: section.name,
    };
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: '13px', 
        fontWeight: '700', 
        color: COLORS.darkBrown,
        marginBottom: '12px',
        fontFamily: 'Georgia, serif'
      }}>
        {title}
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
          {segments.map((seg, idx) => (
            <path key={idx} d={seg.path} fill={seg.color} stroke={COLORS.cardBg} strokeWidth="2" />
          ))}
          <circle cx={chartSize / 2} cy={chartSize / 2} r={innerRadius} fill={COLORS.cardBg} />
        </svg>
        
        {/* Center percentage */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '28px',
          fontWeight: '700',
          color: COLORS.darkBrown,
          fontFamily: 'Georgia, serif'
        }}>
          {percent}%
        </div>
      </div>

      <div style={{ 
        marginTop: '8px', 
        fontSize: '11px', 
        color: COLORS.primaryBrown,
        fontWeight: '500'
      }}>
        {completedTasks} of {totalTasks} complete
      </div>
    </div>
  );
};

// ============================================================================
// SECTION CARD COMPONENT
// ============================================================================

const SectionCard: React.FC<{ section: SectionData; sheetUrl: string }> = ({ section, sheetUrl }) => {
  // Sort: High Priority first → In Progress → Sheet order
  const sortedTasks = useMemo(() => {
    return [...section.tasks].sort((a, b) => {
      const priorityOrder: Record<string, number> = { 'High': 0, 'Medium': 1, 'Low': 2 };
      const statusOrder: Record<string, number> = { 'In Progress': 0, 'Not Started': 1, 'Done': 2 };
      
      // Sort by priority if both have priority field
      if (section.priorityField && a[section.priorityField] && b[section.priorityField]) {
        const aPriority = priorityOrder[a[section.priorityField]] ?? 3;
        const bPriority = priorityOrder[b[section.priorityField]] ?? 3;
        if (aPriority !== bPriority) return aPriority - bPriority;
      }
      
      // Then by status
      const aStatus = statusOrder[a[section.statusField]] ?? 3;
      const bStatus = statusOrder[b[section.statusField]] ?? 3;
      if (aStatus !== bStatus) return aStatus - bStatus;
      
      return 0;
    });
  }, [section.tasks, section.priorityField, section.statusField]);

  const completedCount = section.tasks.filter(t => t[section.statusField] === 'Done').length;
  const totalCount = section.tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: '12px',
        border: `2px solid ${section.color}30`,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          padding: '18px 20px',
          borderLeft: `5px solid ${section.color}`,
          borderBottom: `1px solid ${COLORS.softBorder}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ 
            margin: '0', 
            fontSize: '16px', 
            fontWeight: '700', 
            color: COLORS.darkBrown,
            fontFamily: 'Georgia, serif'
          }}>
            {section.name}
          </h2>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              color: COLORS.primaryBrown,
              backgroundColor: '#f0ebe5',
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            {totalCount} items
          </span>
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div style={{ width: '100%', height: '5px', backgroundColor: '#ede8e2', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: section.color,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        )}
      </div>

      {/* Task List */}
      <div style={{ padding: '14px 18px', flex: 1, overflowY: 'auto', maxHeight: '400px' }}>
        {totalCount === 0 ? (
          <p style={{ margin: '0', fontSize: '12px', color: COLORS.primaryBrown, fontStyle: 'italic' }}>
            No items added yet.
          </p>
        ) : (
          <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
            {sortedTasks.map((task, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: '10px',
                  padding: '10px 12px',
                  backgroundColor: '#fafaf8',
                  borderRadius: '7px',
                  border: `1px solid ${COLORS.softBorder}`,
                }}
              >
                <div style={{ marginBottom: '7px' }}>
                  <p
                    style={{
                      margin: '0',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: COLORS.darkBrown,
                      lineHeight: '1.4',
                    }}
                  >
                    {task[section.primaryField] || 'Untitled'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <StatusBadge status={task[section.statusField] || 'Not Started'} />
                  {section.priorityField && task[section.priorityField] && (
                    <PriorityBadge priority={task[section.priorityField]} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer with "Open Sheet Tab" button */}
      <div
        style={{
          padding: '14px 18px',
          borderTop: `1px solid ${COLORS.softBorder}`,
          backgroundColor: '#fafaf8',
        }}
      >
        <a
          href={sheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '9px 14px',
            backgroundColor: section.color,
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '600',
            textAlign: 'center',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Open Sheet Tab
        </a>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

export default function SSFDashboard() {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<SectionData[]>([]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const fetchSection = async (url: string): Promise<Task[]> => {
          const response = await fetch(url);
          const csvText = await response.text();
          return parseCSV(csvText);
        };

        const [
          executionSchedule,
          phases,
          websitePages,
          gbp,
          citations,
          content,
          reviews,
          socialMedia,
          jobContent,
          internalLinking,
          aiSeo,
          conversionOptimization,
        ] = await Promise.all([
          fetchSection(CSV_URLS.executionSchedule),
          fetchSection(CSV_URLS.phases),
          fetchSection(CSV_URLS.websitePages),
          fetchSection(CSV_URLS.gbp),
          fetchSection(CSV_URLS.citations),
          fetchSection(CSV_URLS.content),
          fetchSection(CSV_URLS.reviews),
          fetchSection(CSV_URLS.socialMedia),
          fetchSection(CSV_URLS.jobContent),
          fetchSection(CSV_URLS.internalLinking),
          fetchSection(CSV_URLS.aiSeo),
          fetchSection(CSV_URLS.conversionOptimization),
        ]);

        setSections([
          { id: 'execution-schedule', name: 'Execution Schedule', color: SECTION_COLORS[0], tasks: executionSchedule, primaryField: 'Task', statusField: 'Status' },
          { id: 'phases', name: 'Phases', color: SECTION_COLORS[1], tasks: phases, primaryField: 'Task', statusField: 'Status', priorityField: 'Priority' },
          { id: 'website-pages', name: 'Website Pages', color: SECTION_COLORS[2], tasks: websitePages, primaryField: 'Page Name', statusField: 'Status', priorityField: 'Priority' },
          { id: 'gbp', name: 'GBP', color: SECTION_COLORS[3], tasks: gbp, primaryField: 'Task', statusField: 'Status', priorityField: 'Priority' },
          { id: 'citations', name: 'Citations', color: SECTION_COLORS[4], tasks: citations, primaryField: 'Directory Name', statusField: 'Status', priorityField: 'Priority' },
          { id: 'content', name: 'Content', color: SECTION_COLORS[5], tasks: content, primaryField: 'Title', statusField: 'Status', priorityField: 'Priority' },
          { id: 'reviews', name: 'Reviews', color: SECTION_COLORS[6], tasks: reviews, primaryField: 'Customer Name', statusField: 'Status' },
          { id: 'social-media', name: 'Social Media', color: SECTION_COLORS[7], tasks: socialMedia, primaryField: 'Post Idea', statusField: 'Status', priorityField: 'Priority' },
          { id: 'job-content', name: 'Job Content', color: SECTION_COLORS[8], tasks: jobContent, primaryField: 'Job Name', statusField: 'Status' },
          { id: 'internal-linking', name: 'Internal Linking', color: SECTION_COLORS[9], tasks: internalLinking, primaryField: 'Page', statusField: 'Status' },
          { id: 'ai-seo', name: 'AI SEO', color: SECTION_COLORS[10], tasks: aiSeo, primaryField: 'Topic', statusField: 'Status' },
          { id: 'conversion-optimization', name: 'Conversion Optimization', color: SECTION_COLORS[11], tasks: conversionOptimization, primaryField: 'Page', statusField: 'Status', priorityField: 'Priority' },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        backgroundColor: COLORS.creamBg, 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: COLORS.darkBrown,
            fontFamily: 'Georgia, serif',
            marginBottom: '12px'
          }}>
            Loading SSF SEO Dashboard...
          </div>
          <div style={{ fontSize: '13px', color: COLORS.primaryBrown }}>
            Fetching data from Google Sheets
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: COLORS.creamBg, minHeight: '100vh', padding: '32px 40px' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.cardBg,
          padding: '24px 32px',
          borderRadius: '12px',
          border: `2px solid ${COLORS.softBorder}`,
          boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* SSF Logo */}
          <img 
            src="/SSF-logo.png" 
            alt="Southern Stock Fence" 
            style={{ 
              height: '100px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          
          <div style={{ borderLeft: `2px solid ${COLORS.softBorder}`, height: '100px', margin: '0 8px' }} />
          
          <div>
            <h1
              style={{
                margin: '0 0 4px 0',
                fontSize: '28px',
                fontWeight: '700',
                color: COLORS.primaryBrown,
                fontFamily: 'Georgia, serif',
                letterSpacing: '-0.5px'
              }}
            >
              SEO Dashboard
            </h1>
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                color: COLORS.darkBrown,
                fontWeight: '500',
              }}
            >
              Execution-focused local SEO system
            </p>
          </div>
        </div>

        {/* Quick Action Links */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={QUICK_LINKS.squarespace}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '11px 18px',
              backgroundColor: COLORS.mutedGold,
              color: 'white',
              borderRadius: '7px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primaryBrown;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.mutedGold;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Squarespace
          </a>
          <a
            href={QUICK_LINKS.gbp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '11px 18px',
              backgroundColor: COLORS.rustAccent,
              color: 'white',
              borderRadius: '7px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primaryBrown;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.rustAccent;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            GBP
          </a>
          <a
            href={QUICK_LINKS.googleSheet}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '11px 18px',
              backgroundColor: COLORS.mutedGreen,
              color: 'white',
              borderRadius: '7px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primaryBrown;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.mutedGreen;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Google Sheet
          </a>
        </div>
      </div>

      {/* 4 Donut Charts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <div style={{
          backgroundColor: COLORS.cardBg,
          padding: '24px 20px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.softBorder}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          <DonutChart title="Phase 1 Progress" sections={sections} phaseFilter={1} />
        </div>
        
        <div style={{
          backgroundColor: COLORS.cardBg,
          padding: '24px 20px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.softBorder}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          <DonutChart title="Phase 2 Progress" sections={sections} phaseFilter={2} />
        </div>
        
        <div style={{
          backgroundColor: COLORS.cardBg,
          padding: '24px 20px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.softBorder}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          <DonutChart title="Phase 3 Progress" sections={sections} phaseFilter={3} />
        </div>
        
        <div style={{
          backgroundColor: COLORS.cardBg,
          padding: '24px 20px',
          borderRadius: '12px',
          border: `1px solid ${COLORS.softBorder}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}>
          <DonutChart title="Overall Progress" sections={sections} />
        </div>
      </div>

      {/* 12 Section Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        <SectionCard section={sections[0]} sheetUrl={SHEET_TAB_URLS.executionSchedule} />
        <SectionCard section={sections[1]} sheetUrl={SHEET_TAB_URLS.phases} />
        <SectionCard section={sections[2]} sheetUrl={SHEET_TAB_URLS.websitePages} />
        <SectionCard section={sections[3]} sheetUrl={SHEET_TAB_URLS.gbp} />
        <SectionCard section={sections[4]} sheetUrl={SHEET_TAB_URLS.citations} />
        <SectionCard section={sections[5]} sheetUrl={SHEET_TAB_URLS.content} />
        <SectionCard section={sections[6]} sheetUrl={SHEET_TAB_URLS.reviews} />
        <SectionCard section={sections[7]} sheetUrl={SHEET_TAB_URLS.socialMedia} />
        <SectionCard section={sections[8]} sheetUrl={SHEET_TAB_URLS.jobContent} />
        <SectionCard section={sections[9]} sheetUrl={SHEET_TAB_URLS.internalLinking} />
        <SectionCard section={sections[10]} sheetUrl={SHEET_TAB_URLS.aiSeo} />
        <SectionCard section={sections[11]} sheetUrl={SHEET_TAB_URLS.conversionOptimization} />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '48px',
          paddingTop: '20px',
          borderTop: `1px solid ${COLORS.softBorder}`,
          textAlign: 'center',
          fontSize: '11px',
          color: COLORS.primaryBrown,
        }}
      >
        <p style={{ margin: '0' }}>
          ✅ Live data from Google Sheets • Last updated: {new Date().toLocaleString()}
        </p>
        <p style={{ margin: '6px 0 0 0' }}>
          Refresh page to pull latest data
        </p>
      </div>
    </div>
  );
}