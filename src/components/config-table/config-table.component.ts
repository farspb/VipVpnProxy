
import { Component, ChangeDetectionStrategy, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseConfig } from '../../models/config.model';

type SortableKeys = 'protocol' | 'location' | 'speed' | 'ping';
type SortDirection = 'asc' | 'desc';

export interface TableTranslations {
  protocol: string;
  location: string;
  speed: string;
  ping: string;
  config: string;
  action: string;
}

@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  imports: [CommonModule],
})
export class ConfigTableComponent {
  title = input.required<string>();
  data = input.required<BaseConfig[]>();
  type = input.required<'vpn' | 'proxy'>();
  translations = input.required<TableTranslations>();

  sortColumn = signal<SortableKeys>('speed');
  sortDirection = signal<SortDirection>('desc');
  copiedId = signal<number | null>(null);

  sortedData = computed(() => {
    const data = this.data();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!data) return [];
    
    return [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      let comparison = 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
        // For speed, descending is better. For ping, ascending is better.
        if (column === 'speed') comparison *= -1;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  });

  setSort(column: SortableKeys): void {
    if (this.sortColumn() === column) {
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set(column === 'ping' ? 'asc' : 'desc');
    }
  }

  copyConfig(config: string, id: number): void {
    navigator.clipboard.writeText(config).then(() => {
      this.copiedId.set(id);
      setTimeout(() => {
        if (this.copiedId() === id) {
          this.copiedId.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  getSpeedColor(speed: number): string {
    const maxSpeed = this.type() === 'vpn' ? 500 : 150; // Increased max proxy speed for new protocols
    if (speed > maxSpeed * 0.8) return 'text-green-400';
    if (speed > maxSpeed * 0.5) return 'text-yellow-400';
    return 'text-red-400';
  }

  getPingColor(ping: number): string {
    if (ping < 50) return 'text-green-400';
    if (ping < 150) return 'text-yellow-400';
    return 'text-red-400';
  }

  getCountryFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
  }
}
