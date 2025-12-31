
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { VpnConfig, ProxyConfig } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class ProxyService {
  fetchConfigs(): Observable<{ vpnConfigs: VpnConfig[]; proxyConfigs: ProxyConfig[] }> {
    const data = this.generateMockData();
    // Simulate network delay and testing time
    return of(data).pipe(delay(2500));
  }

  private generateMockData() {
    const vpnConfigs: VpnConfig[] = [
        { id: 1, protocol: 'WireGuard', location: 'London, UK', countryCode: 'gb', speed: 485, ping: 12, config: 'wg://...long_key.../london1.conf' },
        { id: 2, protocol: 'OpenVPN', location: 'New York, USA', countryCode: 'us', speed: 450, ping: 75, config: 'ovpn://user@us-ny-1.server.com:1194' },
        { id: 3, protocol: 'IKEv2', location: 'Los Angeles, USA', countryCode: 'us', speed: 490, ping: 90, config: 'ikev2://us-la-1.server.com' },
        { id: 4, protocol: 'WireGuard', location: 'Manchester, UK', countryCode: 'gb', speed: 470, ping: 15, config: 'wg://...long_key.../manchester1.conf' },
        { id: 5, protocol: 'OpenVPN', location: 'Frankfurt, DE', countryCode: 'de', speed: 420, ping: 35, config: 'ovpn://user@de-fra-1.server.com:1194' },
        { id: 6, protocol: 'IKEv2', location: 'Chicago, USA', countryCode: 'us', speed: 460, ping: 80, config: 'ikev2://us-chi-1.server.com' },
        { id: 7, protocol: 'WireGuard', location: 'Tokyo, JP', countryCode: 'jp', speed: 380, ping: 150, config: 'wg://...long_key.../tokyo1.conf' },
        { id: 8, protocol: 'OpenVPN', location: 'London, UK', countryCode: 'gb', speed: 430, ping: 14, config: 'ovpn://user@uk-lon-2.server.com:1194' },
        { id: 9, protocol: 'WireGuard', location: 'Miami, USA', countryCode: 'us', speed: 445, ping: 95, config: 'wg://...long_key.../miami1.conf' },
        { id: 10, protocol: 'L2TP/IPsec', location: 'Amsterdam, NL', countryCode: 'nl', speed: 350, ping: 40, config: 'l2tp://nl-ams-1.server.com' },
        { id: 11, protocol: 'WireGuard', location: 'Dallas, USA', countryCode: 'us', speed: 475, ping: 85, config: 'wg://...long_key.../dallas1.conf' },
        { id: 12, protocol: 'OpenVPN', location: 'Toronto, CA', countryCode: 'ca', speed: 410, ping: 70, config: 'ovpn://user@ca-tor-1.server.com:1194' },
        { id: 13, protocol: 'IKEv2', location: 'London, UK', countryCode: 'gb', speed: 455, ping: 13, config: 'ikev2://uk-lon-3.server.com' },
        { id: 14, protocol: 'WireGuard', location: 'Seattle, USA', countryCode: 'us', speed: 480, ping: 100, config: 'wg://...long_key.../seattle1.conf' },
        { id: 15, protocol: 'OpenVPN', location: 'Paris, FR', countryCode: 'fr', speed: 390, ping: 45, config: 'ovpn://user@fr-par-1.server.com:1194' },
        { id: 16, protocol: 'WireGuard', location: 'Glasgow, UK', countryCode: 'gb', speed: 465, ping: 18, config: 'wg://...long_key.../glasgow1.conf' },
        { id: 17, protocol: 'IKEv2', location: 'Atlanta, USA', countryCode: 'us', speed: 440, ping: 88, config: 'ikev2://us-atl-1.server.com' },
        { id: 18, protocol: 'OpenVPN', location: 'Sydney, AU', countryCode: 'au', speed: 320, ping: 220, config: 'ovpn://user@au-syd-1.server.com:1194' },
        { id: 19, protocol: 'WireGuard', location: 'Washington D.C., USA', countryCode: 'us', speed: 455, ping: 78, config: 'wg://...long_key.../dc1.conf' },
        { id: 20, protocol: 'OpenVPN', location: 'Edinburgh, UK', countryCode: 'gb', speed: 425, ping: 17, config: 'ovpn://user@uk-edi-1.server.com:1194' },
        { id: 21, protocol: 'WireGuard', location: 'New York, USA', countryCode: 'us', speed: 510, ping: 72, config: 'wg://...long_key.../ny2.conf' },
        { id: 22, protocol: 'OpenVPN', location: 'Birmingham, UK', countryCode: 'gb', speed: 440, ping: 20, config: 'ovpn://user@uk-bhm-1.server.com:1194' }
    ];

    const proxyConfigs: ProxyConfig[] = [
        { id: 101, protocol: 'SOCKS5', location: 'New York, USA', countryCode: 'us', speed: 95, ping: 72, config: 'socks5://user:pass@123.45.67.89:1080' },
        { id: 102, protocol: 'HTTPS', location: 'London, UK', countryCode: 'gb', speed: 98, ping: 10, config: 'https://proxy.uk.server.com:8443' },
        { id: 103, protocol: 'VLESS', location: 'London, UK', countryCode: 'gb', speed: 120, ping: 11, config: 'vless://uuid@server.com:443?security=tls&sni=server.com&type=ws#VLESS-UK' },
        { id: 104, protocol: 'VMess', location: 'New York, USA', countryCode: 'us', speed: 115, ping: 70, config: 'vmess://ewoi...CI6ICJVUyIKfQ==' },
        { id: 105, protocol: 'HTTP', location: 'Los Angeles, USA', countryCode: 'us', speed: 85, ping: 92, config: 'http://23.45.67.89:8080' },
        { id: 106, protocol: 'Shadowsocks', location: 'Los Angeles, USA', countryCode: 'us', speed: 110, ping: 88, config: 'ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ@la.server.com:8388#SS-US' },
        { id: 107, protocol: 'SOCKS4', location: 'Manchester, UK', countryCode: 'gb', speed: 92, ping: 14, config: 'socks4://12.34.56.78:1080' },
        { id: 108, protocol: 'Trojan', location: 'Frankfurt, DE', countryCode: 'de', speed: 105, ping: 32, config: 'trojan://password@de.server.com:443#Trojan-DE' },
        { id: 109, protocol: 'SOCKS5', location: 'Frankfurt, DE', countryCode: 'de', speed: 88, ping: 33, config: 'socks5://user:pass@34.56.78.90:1080' },
        { id: 110, protocol: 'HTTPS', location: 'Chicago, USA', countryCode: 'us', speed: 93, ping: 81, config: 'https://proxy.us-chi.server.com:8443' },
        { id: 111, protocol: 'SOCKS5', location: 'London, UK', countryCode: 'gb', speed: 99, ping: 11, config: 'socks5://user:pass@45.67.89.12:1080' },
        { id: 112, protocol: 'HTTP', location: 'Tokyo, JP', countryCode: 'jp', speed: 75, ping: 155, config: 'http://56.78.90.12:8080' },
        { id: 113, protocol: 'HTTPS', location: 'Miami, USA', countryCode: 'us', speed: 90, ping: 93, config: 'https://proxy.us-mia.server.com:8443' },
        { id: 114, protocol: 'SOCKS5', location: 'Amsterdam, NL', countryCode: 'nl', speed: 89, ping: 38, config: 'socks5://user:pass@67.89.12.34:1080' },
        { id: 115, protocol: 'SOCKS4', location: 'Dallas, USA', countryCode: 'us', speed: 91, ping: 83, config: 'socks4://78.90.12.34:1080' },
        { id: 116, protocol: 'HTTPS', location: 'Toronto, CA', countryCode: 'ca', speed: 87, ping: 68, config: 'https://proxy.ca-tor.server.com:8443' },
        { id: 117, protocol: 'HTTP', location: 'London, UK', countryCode: 'gb', speed: 96, ping: 12, config: 'http://89.12.34.56:8080' },
        { id: 118, protocol: 'SOCKS5', location: 'Seattle, USA', countryCode: 'us', speed: 94, ping: 98, config: 'socks5://user:pass@90.12.34.56:1080' },
        { id: 119, protocol: 'HTTPS', location: 'Paris, FR', countryCode: 'fr', speed: 86, ping: 42, config: 'https://proxy.fr-par.server.com:8443' },
        { id: 120, protocol: 'SOCKS5', location: 'Glasgow, UK', countryCode: 'gb', speed: 97, ping: 16, config: 'socks5://user:pass@12.34.56.78:1080' },
        { id: 121, protocol: 'HTTP', location: 'Atlanta, USA', countryCode: 'us', speed: 89, ping: 86, config: 'http://23.45.67.89:8080' },
        { id: 122, protocol: 'HTTPS', location: 'Sydney, AU', countryCode: 'au', speed: 70, ping: 225, config: 'https://proxy.au-syd.server.com:8443' },
        { id: 123, protocol: 'SOCKS5', location: 'Washington D.C., USA', countryCode: 'us', speed: 92, ping: 76, config: 'socks5://user:pass@34.56.78.90:1080' },
        { id: 124, protocol: 'HTTPS', location: 'Edinburgh, UK', countryCode: 'gb', speed: 95, ping: 15, config: 'https://proxy.uk-edi.server.com:8443' }
    ];
    return { vpnConfigs, proxyConfigs };
  }
}
