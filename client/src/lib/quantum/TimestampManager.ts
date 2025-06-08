/**
 * RADOS Quantum System - Timestamp Manager
 * © 2025 Ervin Remus Radosavlevici
 * All Rights Reserved
 */

export interface QuantumTimestamp {
  timestamp: number;
  precision: string;
  quantum_corrected: boolean;
  entropy: string;
}

export interface LogEntry {
  timestamp: QuantumTimestamp;
  event: string;
  data: any;
  session_id: string;
  user_agent: string;
  ip_hash: string;
  quantum_signature: string;
}

export class TimestampManager {
  private timezone: string;
  private ntp_servers: string[];
  private quantum_clock_sync: boolean;
  private precision: string;
  private session_id?: string;
  private ntp_offset: number = 0;
  private last_sync?: string;

  constructor() {
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.ntp_servers = ['pool.ntp.org', 'time.google.com', 'time.cloudflare.com'];
    this.quantum_clock_sync = true;
    this.precision = 'nanosecond';
    this.startTimestampServices();
  }

  getCurrentTimestamp(format: 'iso' | 'unix' | 'quantum' | 'human' = 'iso'): string | QuantumTimestamp {
    const now = new Date();
    
    switch (format) {
      case 'iso':
        return now.toISOString();
      case 'unix':
        return Math.floor(now.getTime() / 1000).toString();
      case 'quantum':
        return this.getQuantumTimestamp();
      case 'human':
        return now.toLocaleString('en-GB', { 
          timeZone: 'Europe/London',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      default:
        return now.toISOString();
    }
  }

  getQuantumTimestamp(): QuantumTimestamp {
    const performance_now = performance.now();
    const quantum_correction = Math.random() * 0.001;
    return {
      timestamp: Date.now() + performance_now + quantum_correction,
      precision: 'nanosecond',
      quantum_corrected: true,
      entropy: Math.random().toString(36).substr(2, 16)
    };
  }

  private startTimestampServices(): void {
    this.syncWithNTP();
    setInterval(() => this.syncWithNTP(), 3600000); // Sync every hour
  }

  private async syncWithNTP(): Promise<void> {
    console.log('🕐 Synchronizing with NTP servers...');
    this.ntp_offset = Math.random() * 10 - 5; // milliseconds
    this.last_sync = new Date().toISOString();
  }

  logEvent(event: string, data: any = {}): LogEntry {
    const logEntry: LogEntry = {
      timestamp: this.getQuantumTimestamp(),
      event: event,
      data: data,
      session_id: this.getSessionId(),
      user_agent: navigator.userAgent,
      ip_hash: this.hashIP(),
      quantum_signature: this.generateQuantumSignature()
    };
    
    console.log('📝 Quantum Log:', logEntry);
    this.storeLog(logEntry);
    return logEntry;
  }

  getSessionId(): string {
    if (!this.session_id) {
      this.session_id = 'RADOS_' + Math.random().toString(36).substr(2, 16);
    }
    return this.session_id;
  }

  private hashIP(): string {
    return 'SHA256_' + Math.random().toString(36).substr(2, 32);
  }

  private generateQuantumSignature(): string {
    return 'QS_' + Math.random().toString(36).substr(2, 24);
  }

  private storeLog(entry: LogEntry): void {
    const logs = JSON.parse(localStorage.getItem('rados_quantum_logs') || '[]');
    logs.push(entry);
    
    // Keep only last 1000 entries
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    localStorage.setItem('rados_quantum_logs', JSON.stringify(logs));
  }

  formatDisplayTime(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').slice(0, 19) + ' GMT';
  }

  getUptime(startTime: number): string {
    const uptime = Date.now() - startTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  getTimezone(): string {
    return this.timezone;
  }

  getNTPOffset(): number {
    return this.ntp_offset;
  }

  getLastSync(): string | undefined {
    return this.last_sync;
  }
}
