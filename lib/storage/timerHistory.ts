interface TimerSession {
  id: string;
  timerType: string;
  startTime: number;
  endTime: number;
  duration: number;
  completed: boolean;
  sessionType: 'work' | 'break' | 'longBreak';
}

interface TimerHistory {
  sessions: TimerSession[];
  totalSessions: number;
  totalFocusTime: number;
  totalBreakTime: number;
}

class TimerHistoryService {
  private readonly STORAGE_KEY = 'timemaster-history';

  getHistory(): TimerHistory {
    if (typeof window === 'undefined') {
      return { sessions: [], totalSessions: 0, totalFocusTime: 0, totalBreakTime: 0 };
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load timer history:', error);
    }

    return { sessions: [], totalSessions: 0, totalFocusTime: 0, totalBreakTime: 0 };
  }

  addSession(session: Omit<TimerSession, 'id'>): void {
    if (typeof window === 'undefined') return;

    const history = this.getHistory();
    const newSession: TimerSession = {
      ...session,
      id: Date.now().toString(),
    };

    history.sessions.unshift(newSession);
    history.totalSessions++;

    if (session.sessionType === 'work') {
      history.totalFocusTime += session.duration;
    } else {
      history.totalBreakTime += session.duration;
    }

    // Keep only last 100 sessions
    if (history.sessions.length > 100) {
      history.sessions = history.sessions.slice(0, 100);
    }

    this.saveHistory(history);
  }

  private saveHistory(history: TimerHistory): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save timer history:', error);
    }
  }

  clearHistory(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.STORAGE_KEY);
  }

  exportData(): string {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      // Validate data structure
      if (!data.sessions || !Array.isArray(data.sessions)) {
        return false;
      }

      localStorage.setItem(this.STORAGE_KEY, jsonData);
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  getStats() {
    const history = this.getHistory();
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const weekStart = todayStart - (6 * 24 * 60 * 60 * 1000);

    const todaySessions = history.sessions.filter(s => s.startTime >= todayStart);
    const weekSessions = history.sessions.filter(s => s.startTime >= weekStart);

    return {
      today: {
        sessions: todaySessions.length,
        focusTime: todaySessions.filter(s => s.sessionType === 'work').reduce((sum, s) => sum + s.duration, 0),
      },
      week: {
        sessions: weekSessions.length,
        focusTime: weekSessions.filter(s => s.sessionType === 'work').reduce((sum, s) => sum + s.duration, 0),
      },
      total: {
        sessions: history.totalSessions,
        focusTime: history.totalFocusTime,
      },
    };
  }
}

export const timerHistory = new TimerHistoryService();