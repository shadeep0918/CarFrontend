import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface TickerStat {
  label: string;
  target: number;
  decimals?: number;
  suffix?: string;
  display: string;
}

interface GaugeSpec {
  value: number;
  max: number;
  unitLabel: string;
  display: string;
  offset: number; // drives --fill-offset
  angle: number; // drives --needle-angle (deg)
  active: boolean;
}

interface SpecRow {
  label: string;
  value: string;
}

interface Swatch {
  name: string;
  hex: string;
}

const GAUGE_ARC_LENGTH = 251; // matches the SVG path length used in the template

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car.html',
  styleUrls: ['./car.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // ---------- nav ----------
  navOpen = false;

  toggleNav(): void {
    this.navOpen = !this.navOpen;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  // ---------- hero ticker ----------
  tickerStats : TickerStat[] = [
    { label: '0–60 mph', target: 2.9, decimals: 1, display: '0.0' },
    { label: 'Top speed', target: 205, suffix: ' mph', display: '0' },
    { label: 'Range', target: 340, suffix: ' mi', display: '0' },
    { label: 'Power', target: 620, suffix: ' hp', display: '0' },
  ];

  // ---------- performance: stat card + gauges ----------
  statCard: TickerStat = { label: '0–60 mph', target: 2.9, decimals: 1, display: '0.0' };

  gauges: GaugeSpec[] = [
    {
      value: 205,
      max: 220,
      unitLabel: 'mph top speed',
      display: '0',
      offset: GAUGE_ARC_LENGTH,
      angle: -90,
      active: false,
    },
    {
      value: 340,
      max: 400,
      unitLabel: 'mi EPA range',
      display: '0',
      offset: GAUGE_ARC_LENGTH,
      angle: -90,
      active: false,
    },
  ];

  // ---------- design / specs ----------
  specs: SpecRow[] = [
    { label: 'Drivetrain', value: 'Dual motor, AWD, torque vectoring' },
    { label: 'Power / torque', value: '620 hp / 686 lb-ft' },
    { label: 'Battery', value: '102 kWh, 800V architecture' },
    { label: 'Charging', value: '10–80% in 18 min (350 kW DC)' },
    { label: '0–60 mph', value: '2.9 sec' },
    { label: 'Top speed', value: '205 mph (electronically limited)' },
    { label: 'EPA range', value: '340 mi' },
    { label: 'Curb weight', value: '4,150 lb' },
    { label: 'Suspension', value: 'Adaptive dual-chamber air, front & rear' },
    { label: 'Brakes', value: '410mm carbon-ceramic, 6-piston front' },
  ];

  // ---------- configurator ----------
  swatches: Swatch[] = [
    { name: 'Racing Green', hex: '#1F3D2E' },
    { name: 'Graphite', hex: '#2B2F2D' },
    { name: 'Alu Silver', hex: '#C8CDC9' },
    { name: 'Redline', hex: '#FF5A36' },
  ];

  selectedSwatch: Swatch = this.swatches[0];

  selectSwatch(swatch: Swatch): void {
    this.selectedSwatch = swatch;
  }

  get configBodyFill(): string {
    return this.selectedSwatch.hex + '40'; // ~25% alpha
  }

  // ---------- view refs for scroll-triggered animation ----------
  @ViewChild('tickerEl') tickerEl?: ElementRef<HTMLElement>;
  @ViewChild('statCardEl') statCardEl?: ElementRef<HTMLElement>;
  @ViewChildren('gaugeEl') gaugeEls?: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;
  private reduceMotion = false;

  constructor(private zone: NgZone) {
    this.reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // fallback: just show final values
      this.revealTicker();
      this.revealStatCard();
      this.gauges.forEach((g) => this.activateGauge(g));
      return;
    }

    // IntersectionObserver callbacks don't need change detection zone patches
    // for setup, only the rAF loop inside does — run outside then re-enter there.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            if (entry.target === this.tickerEl?.nativeElement) {
              this.zone.run(() => this.revealTicker());
            } else if (entry.target === this.statCardEl?.nativeElement) {
              this.zone.run(() => this.revealStatCard());
            } else {
              const idx = this.gaugeEls
                ?.toArray()
                .findIndex((ref) => ref.nativeElement === entry.target);
              if (idx !== undefined && idx > -1) {
                this.zone.run(() => this.activateGauge(this.gauges[idx]));
              }
            }

            this.observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.4 },
      );

      if (this.tickerEl) this.observer.observe(this.tickerEl.nativeElement);
      if (this.statCardEl) this.observer.observe(this.statCardEl.nativeElement);
      this.gaugeEls?.forEach((ref) => this.observer?.observe(ref.nativeElement));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  // ---------- animation helpers ----------
  private revealTicker(): void {
    this.tickerStats.forEach((stat) => this.animateValue(stat));
  }

  private revealStatCard(): void {
    this.animateValue(this.statCard);
  }

  private activateGauge(gauge: GaugeSpec): void {
    const fraction = Math.max(0, Math.min(gauge.value / gauge.max, 1));
    gauge.offset = GAUGE_ARC_LENGTH - GAUGE_ARC_LENGTH * fraction;
    gauge.angle = -90 + 180 * fraction;
    gauge.active = true;

    this.animateValue(
      {
        target: gauge.value,
        decimals: 0,
        suffix: '',
        display: gauge.display,
        label: '',
      },
      (value) => (gauge.display = value),
    );
  }

  private animateValue(
    stat: TickerStat,
    onFrame: (display: string) => void = (v) => (stat.display = v),
  ): void {
    const decimals = stat.decimals ?? 0;
    const suffix = stat.suffix ?? '';

    if (this.reduceMotion || typeof requestAnimationFrame === 'undefined') {
      onFrame(stat.target.toFixed(decimals) + suffix);
      return;
    }

    const duration = 1200;
    let start: number | null = null;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = stat.target * eased;

      this.zone.run(() => onFrame(value.toFixed(decimals) + suffix));

      if (progress < 1) {
        this.zone.runOutsideAngular(() => requestAnimationFrame(step));
      }
    };

    this.zone.runOutsideAngular(() => requestAnimationFrame(step));
  }
}
