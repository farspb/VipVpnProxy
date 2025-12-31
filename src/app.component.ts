
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigTableComponent, TableTranslations } from './components/config-table/config-table.component';
import { ProxyService } from './services/proxy.service';
import { VpnConfig, ProxyConfig } from './models/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ConfigTableComponent],
})
export class AppComponent {
  private proxyService = inject(ProxyService);

  isLoading = signal(false);
  hasLoaded = signal(false);
  vpnConfigs = signal<VpnConfig[]>([]);
  proxyConfigs = signal<ProxyConfig[]>([]);
  currentLang = signal<'en' | 'fa'>('fa');

  private translations = {
    en: {
      appTitleHighlight: 'VIP',
      appTitle: 'VPN List',
      appSubtitle: 'Discover the fastest and most secure VPN & Proxy configurations. Click the button below to fetch the latest, performance-tested configs.',
      fetchButton: 'Fetch Latest Configurations',
      testingButton: 'Testing Connections...',
      readyTitle: 'Ready to find your connection.',
      readySubtitle: 'Click the fetch button to begin.',
      vpnTitle: 'VPN Configurations',
      proxyTitle: 'Proxy Configurations',
      protocol: 'Protocol',
      location: 'Location',
      speed: 'Speed',
      ping: 'Ping',
      config: 'Configuration',
      action: 'Action'
    },
    fa: {
      appTitleHighlight: 'VIP',
      appTitle: 'لیست VPN',
      appSubtitle: 'سریعترین و امن ترین تنظیمات VPN و پراکسی را کشف کنید. برای دریافت آخرین تنظیمات تست شده، روی دکمه زیر کلیک کنید.',
      fetchButton: 'دریافت آخرین تنظیمات',
      testingButton: 'در حال تست اتصالات...',
      readyTitle: 'آماده برای پیدا کردن اتصال شما.',
      readySubtitle: 'برای شروع روی دکمه دریافت کلیک کنید.',
      vpnTitle: 'تنظیمات VPN',
      proxyTitle: 'تنظیمات پراکسی',
      protocol: 'پروتکل',
      location: 'مکان',
      speed: 'سرعت',
      ping: 'پینگ',
      config: 'پیکربندی',
      action: 'عملیات'
    }
  };

  currentTranslations = computed(() => this.translations[this.currentLang()]);
  
  tableTranslations = computed<TableTranslations>(() => {
    const t = this.currentTranslations();
    return {
        protocol: t.protocol,
        location: t.location,
        speed: t.speed,
        ping: t.ping,
        config: t.config,
        action: t.action,
    }
  });

  toggleLang(): void {
    this.currentLang.update(lang => lang === 'en' ? 'fa' : 'en');
  }

  fetchConfigs(): void {
    this.isLoading.set(true);
    this.hasLoaded.set(false);
    this.vpnConfigs.set([]);
    this.proxyConfigs.set([]);

    this.proxyService.fetchConfigs().subscribe({
      next: (data) => {
        this.vpnConfigs.set(data.vpnConfigs);
        this.proxyConfigs.set(data.proxyConfigs);
        this.isLoading.set(false);
        this.hasLoaded.set(true);
      },
      error: (err) => {
        console.error('Failed to fetch configs', err);
        this.isLoading.set(false);
      },
    });
  }
}
