import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Cell
} from 'recharts';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get('/api/student/performance');
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  // Simulated data for development (replace with actual API response)
  const mockData = {
    studentInfo: {
      name: "Alex Johnson",
      id: "S12345",
      grade: "10th",
      overallGPA: 3.7
    },
    subjects: [
      { name: "exp1", score: 92, average: 78, improvement: 5 },
      { name: "exp2", score: 88, average: 75, improvement: 3 },
      { name: "exp3", score: 85, average: 80, improvement: -2 },
      { name: "exp4", score: 78, average: 72, improvement: 4 },
      { name: "exp5", score: 95, average: 82, improvement: 7 }
    ],
    attendance: {
      present: 42,
      absent: 3,
      late: 5
    },
    timeSpent: [
      { subject: "exp1", hours: 25 },
      { subject: "exp2", hours: 20 },
      { subject: "exp3", hours: 18 },
      { subject: "exp4", hours: 15 },
      { subject: "exp5", hours: 22 }
    ],
    weeklyProgress: [
      { week: "Week 1", score: 75 },
      { week: "Week 2", score: 78 },
      { week: "Week 3", score: 80 },
      { week: "Week 4", score: 82 },
      { week: "Week 5", score: 85 },
      { week: "Week 6", score: 83 },
      { week: "Week 7", score: 88 },
      { week: "Week 8", score: 90 }
    ],
    strengths: ["Problem Solving", "Critical Thinking", "Research"],
    areasForImprovement: ["Time Management", "score increasemeny", "quiz"],
    upcomingAssignments: [
      { title: " Problem Set exp", dueDate: "2025-03-05", priority: "High" },
      { title: " Lab Report", dueDate: "2025-03-10", priority: "Medium" },
      { title: "History ", dueDate: "2025-03-15", priority: "High" }
    ]
  };

  // Use mock data for development
  const data = studentData || mockData;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f8fa',
      padding: '20px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
    },
    studentInfo: {
      fontSize: '16px',
      color: '#666',
    },
    tabContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '10px',
    },
    tab: {
      padding: '10px 15px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontWeight: 500,
    },
    activeTab: {
      backgroundColor: '#3f51b5',
      color: 'white',
    },
    inactiveTab: {
      backgroundColor: '#e0e0e0',
      color: '#333',
    },
    dashboard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#333',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
    },
    fullWidthCard: {
      gridColumn: '1 / -1',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    },
    stat: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    statLabel: {
      flex: '1',
      fontSize: '14px',
      color: '#666',
    },
    statValue: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    },
    listItem: {
      padding: '10px',
      borderBottom: '1px solid #eee',
      fontSize: '14px',
    },
    indicator: {
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '8px',
    },
    suggestionItem: {
      padding: '12px',
      borderLeft: '3px solid #3f51b5',
      marginBottom: '10px',
      backgroundColor: '#f0f4ff',
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading student data...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Student Performance Dashboard</h1>
          <div style={styles.studentInfo}>
            <p>
              <strong>{data.studentInfo.name}</strong> | ID: {data.studentInfo.id} | 
              Grade: {data.studentInfo.grade} | Score: {data.studentInfo.overallGPA}
            </p>
          </div>
        </div>
      </div>

      <div style={styles.tabContainer}>
        {['overview',  'attendance', 'time', 'improvement'].map(tab => (
          <div
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : styles.inactiveTab)
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={styles.dashboard}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Overall Performance</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={data.subjects}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Student Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Total Average" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Weekly Progress</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Time Spent by Experiment</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.timeSpent}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="hours"
                >
                  {data.timeSpent.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} hours`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{...styles.card, ...styles.fullWidthCard}}>
            <h2 style={styles.cardTitle}>Quiz Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.subjects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Your Score" fill="#8884d8" />
                <Bar dataKey="average" name="total Average" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Strengths</h2>
            {data.strengths.map((strength, index) => (
              <div key={index} style={styles.listItem}>
                <span style={{...styles.indicator, backgroundColor: '#4caf50'}}></span>
                {strength}
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Areas for Improvement</h2>
            {data.areasForImprovement.map((area, index) => (
              <div key={index} style={styles.listItem}>
                <span style={{...styles.indicator, backgroundColor: '#ff9800'}}></span>
                {area}
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Upcoming Assignments</h2>
            {data.upcomingAssignments.map((assignment, index) => (
              <div key={index} style={styles.listItem}>
                <div><strong>{assignment.title}</strong></div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666'}}>
                  <span>Due: {assignment.dueDate}</span>
                  <span style={{
                    color: assignment.priority === 'High' ? '#f44336' : 
                          assignment.priority === 'Medium' ? '#ff9800' : '#4caf50'
                  }}>
                    {assignment.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      

      {activeTab === 'attendance' && (
        <div style={styles.dashboard}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Attendance Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Present', value: data.attendance.present },
                    { name: 'Absent', value: data.attendance.absent },
                    { name: 'Late', value: data.attendance.late }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#4caf50" />
                  <Cell fill="#f44336" />
                  <Cell fill="#ff9800" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Attendance Impact</h2>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Attendance Rate:</span>
              <span style={styles.statValue}>
                {Math.round(data.attendance.present / (data.attendance.present + data.attendance.absent + data.attendance.late) * 100)}%
              </span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Days Present:</span>
              <span style={styles.statValue}>{data.attendance.present}</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Days Absent:</span>
              <span style={styles.statValue}>{data.attendance.absent}</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statLabel}>Days Late:</span>
              <span style={styles.statValue}>{data.attendance.late}</span>
            </div>
            
            <div style={{marginTop: '20px'}}>
              <div style={styles.suggestionItem}>
                Your attendance has a direct correlation with your EXP performance. Each 1% increase in attendance typically results in a 0.5% increase in scores.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'time' && (
        <div style={styles.dashboard}>
          <div style={{...styles.card, ...styles.fullWidthCard}}>
            <h2 style={styles.cardTitle}>Study Time Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data.timeSpent}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="subject" />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" name="Hours Spent" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Time Management Tips</h2>
            <div style={styles.suggestionItem}>
              <strong>Pomodoro Technique:</strong> Try studying in 25-minute blocks with 5-minute breaks to maintain focus and productivity.
            </div>
            <div style={styles.suggestionItem}>
              <strong>Priority Matrix:</strong> Categorize tasks by urgency and importance to better allocate your study time.
            </div>
            <div style={styles.suggestionItem}>
              <strong>Subject Balance:</strong> Consider allocating more time to Critical experiment to improve your scores in that area.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'improvement' && (
        <div style={styles.dashboard}>
          <div style={{...styles.card, ...styles.fullWidthCard}}>
            <h2 style={styles.cardTitle}>Improvement by experiment</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data.subjects}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="improvement" name="Points Improved" fill="#4caf50">
                  {data.subjects.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.improvement >= 0 ? '#4caf50' : '#f44336'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Personalized Improvement Plan</h2>
            <div style={styles.suggestionItem}>
              <strong>Short-term Goals:</strong>
              <ul>
                <li>Improve chemistry score by focusing on hands On</li>
                <li>Create a consistent study schedule with dedicated time for this subject</li>
              </ul>
            </div>
            <div style={styles.suggestionItem}>
              <strong>Mid-term Goals:</strong>
              <ul>
                <li>Join study groups for collaborative learning</li>
                <li>Schedule monthly progress reviews with teachers</li>
              </ul>
            </div>
            <div style={styles.suggestionItem}>
              <strong>Long-term Goals:</strong>
              <ul>
                <li>Achieve and maintain a 3.8+ GPA in chemistry</li>
                <li>Develop independent research skills across this subject</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
