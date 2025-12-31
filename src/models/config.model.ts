
export interface BaseConfig {
  id: number;
  protocol: string;
  location: string;
  countryCode: string;
  speed: number; // in Mbps
  ping: number; // in ms
  config: string;
}

export interface VpnConfig extends BaseConfig {}

export interface ProxyConfig extends BaseConfig {}
