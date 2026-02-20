# Marketing Analytics Dashboard
# Tracks engagement, reach, conversions, CTR, and ROI across marketing channels.

from __future__ import annotations

import math
import random
import sys
import warnings
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from enum import Enum
from statistics import mean
from typing import Optional


# ---------------------------------------------------------------------------
# Enums & Data Models
# ---------------------------------------------------------------------------

class Channel(Enum):
    FACEBOOK   = "Facebook"
    INSTAGRAM  = "Instagram"
    TWITTER_X  = "Twitter/X"
    EMAIL      = "Email"
    GOOGLE_ADS = "Google Ads"


@dataclass
class EngagementMetrics:
    likes:    int = 0
    comments: int = 0
    shares:   int = 0

    @property
    def total(self) -> int:
        return self.likes + self.comments + self.shares


@dataclass
class ReachMetrics:
    impressions:  int = 0
    unique_views: int = 0

    @property
    def reach_rate(self) -> float:
        if self.impressions == 0:
            return 0.0
        return round(self.unique_views / self.impressions, 4)


@dataclass
class ConversionMetrics:
    sign_ups:  int = 0
    purchases: int = 0
    clicks:    int = 0

    @property
    def total_conversions(self) -> int:
        return self.sign_ups + self.purchases + self.clicks


@dataclass
class CampaignRecord:
    """One data point per channel per day."""
    channel:     Channel
    date:        date
    engagement:  EngagementMetrics
    reach:       ReachMetrics
    conversions: ConversionMetrics
    spend:       float   # ad spend in USD
    revenue:     float   # attributed revenue in USD

    def __post_init__(self):
        if self.spend < 0:
            raise ValueError(f"spend must be >= 0, got {self.spend}")
        if self.revenue < 0:
            raise ValueError(f"revenue must be >= 0, got {self.revenue}")

    @property
    def ctr(self) -> float:
        """Click-Through Rate = clicks / impressions."""
        if self.reach.impressions == 0:
            return 0.0
        return round(self.conversions.clicks / self.reach.impressions, 6)

    @property
    def roi(self) -> float:
        """ROI % = (revenue - spend) / spend * 100."""
        if self.spend == 0:
            return 0.0
        return round((self.revenue - self.spend) / self.spend * 100, 2)

    @property
    def conversion_rate(self) -> float:
        """Total conversions / clicks."""
        if self.conversions.clicks == 0:
            return 0.0
        return round(self.conversions.total_conversions / self.conversions.clicks, 4)


# ---------------------------------------------------------------------------
# Summary Dataclasses
# ---------------------------------------------------------------------------

@dataclass
class ChannelSummary:
    channel:            Channel
    total_impressions:  int
    total_unique_views: int
    total_engagement:   int
    total_clicks:       int
    total_conversions:  int
    total_spend:        float
    total_revenue:      float
    avg_ctr:            float   # mean of per-day CTR values
    avg_roi:            float   # mean of per-day ROI values
    avg_reach_rate:     float


@dataclass
class DailySummary:
    date:             date
    total_engagement: int
    total_impressions: int


@dataclass
class OverallSummary:
    total_spend:        float
    total_revenue:      float
    total_impressions:  int
    total_engagement:   int
    total_conversions:  int
    overall_roi:        float
    overall_ctr:        float
    best_roi_channel:   Channel
    best_ctr_channel:   Channel
    best_reach_channel: Channel
    best_engagement_channel: Channel
    best_conversion_channel: Channel


# ---------------------------------------------------------------------------
# Data Source
# ---------------------------------------------------------------------------

class DataSource:
    def fetch(self, start: date, end: date) -> list[CampaignRecord]:
        raise NotImplementedError


class SimulatedDataSource(DataSource):
    """Generates reproducible pseudo-random marketing data (seed=42)."""

    # Profile: impressions_range, engage_rate_range, ctr_range, conv_rate_range,
    #          spend_range, roas_range
    CHANNEL_PROFILES = {
        Channel.FACEBOOK: {
            "impressions":  (25_000, 35_000),
            "engage_rate":  (0.14, 0.18),
            "ctr":          (0.016, 0.022),
            "conv_rate":    (0.04, 0.08),
            "spend":        (350.0, 500.0),
            "roas":         (2.8, 3.5),
        },
        Channel.INSTAGRAM: {
            "impressions":  (18_000, 26_000),
            "engage_rate":  (0.15, 0.22),
            "ctr":          (0.015, 0.020),
            "conv_rate":    (0.05, 0.09),
            "spend":        (280.0, 380.0),
            "roas":         (2.6, 3.2),
        },
        Channel.TWITTER_X: {
            "impressions":  (15_000, 20_000),
            "engage_rate":  (0.06, 0.10),
            "ctr":          (0.012, 0.018),
            "conv_rate":    (0.02, 0.05),
            "spend":        (170.0, 240.0),
            "roas":         (1.8, 2.5),
        },
        Channel.EMAIL: {
            "impressions":  (1_200, 1_800),
            "engage_rate":  (0.22, 0.30),
            "ctr":          (0.14, 0.22),
            "conv_rate":    (0.08, 0.15),
            "spend":        (60.0, 90.0),
            "roas":         (4.5, 6.0),
        },
        Channel.GOOGLE_ADS: {
            "impressions":  (22_000, 28_000),
            "engage_rate":  (0.05, 0.08),
            "ctr":          (0.020, 0.030),
            "conv_rate":    (0.06, 0.12),
            "spend":        (430.0, 560.0),
            "roas":         (3.0, 3.8),
        },
    }

    def fetch(self, start: date, end: date) -> list[CampaignRecord]:
        if start > end:
            raise ValueError("start date must be before or equal to end date")
        total_days = (end - start).days + 1
        if total_days > 365:
            warnings.warn(
                f"Date range spans {total_days} days. Large ranges may produce verbose output.",
                UserWarning,
                stacklevel=2,
            )

        rng = random.Random(42)
        records: list[CampaignRecord] = []
        current = start
        while current <= end:
            for channel, profile in self.CHANNEL_PROFILES.items():
                impressions = rng.randint(*profile["impressions"])
                unique_views = int(impressions * rng.uniform(0.55, 0.75))
                engage_rate = rng.uniform(*profile["engage_rate"])
                total_engage = int(impressions * engage_rate)
                likes    = int(total_engage * rng.uniform(0.55, 0.65))
                comments = int(total_engage * rng.uniform(0.10, 0.20))
                shares   = total_engage - likes - comments

                ctr = rng.uniform(*profile["ctr"])
                clicks = int(impressions * ctr)
                conv_rate = rng.uniform(*profile["conv_rate"])
                total_conv = int(clicks * conv_rate)
                sign_ups  = int(total_conv * rng.uniform(0.4, 0.6))
                purchases = int(total_conv * rng.uniform(0.2, 0.35))
                extra_clicks = total_conv - sign_ups - purchases

                spend   = round(rng.uniform(*profile["spend"]), 2)
                roas    = rng.uniform(*profile["roas"])
                revenue = round(spend * roas, 2)

                record = CampaignRecord(
                    channel=channel,
                    date=current,
                    engagement=EngagementMetrics(
                        likes=likes,
                        comments=comments,
                        shares=max(0, shares),
                    ),
                    reach=ReachMetrics(
                        impressions=impressions,
                        unique_views=unique_views,
                    ),
                    conversions=ConversionMetrics(
                        sign_ups=sign_ups,
                        purchases=purchases,
                        clicks=max(0, clicks),
                    ),
                    spend=spend,
                    revenue=revenue,
                )
                records.append(record)
            current += timedelta(days=1)
        return records


# ---------------------------------------------------------------------------
# Aggregation Engine
# ---------------------------------------------------------------------------

class MetricsAggregator:
    def __init__(self, records: list[CampaignRecord]):
        if not records:
            raise ValueError("No campaign records provided to MetricsAggregator.")
        self._records = records

    def by_channel(self) -> dict[Channel, ChannelSummary]:
        grouped: dict[Channel, list[CampaignRecord]] = defaultdict(list)
        for r in self._records:
            grouped[r.channel].append(r)

        result: dict[Channel, ChannelSummary] = {}
        for channel, recs in grouped.items():
            result[channel] = ChannelSummary(
                channel=channel,
                total_impressions=sum(r.reach.impressions for r in recs),
                total_unique_views=sum(r.reach.unique_views for r in recs),
                total_engagement=sum(r.engagement.total for r in recs),
                total_clicks=sum(r.conversions.clicks for r in recs),
                total_conversions=sum(r.conversions.total_conversions for r in recs),
                total_spend=round(sum(r.spend for r in recs), 2),
                total_revenue=round(sum(r.revenue for r in recs), 2),
                avg_ctr=round(mean(r.ctr for r in recs) * 100, 4),       # as %
                avg_roi=round(mean(r.roi for r in recs), 2),
                avg_reach_rate=round(mean(r.reach.reach_rate for r in recs), 4),
            )
        return result

    def by_date(self) -> dict[date, DailySummary]:
        grouped: dict[date, list[CampaignRecord]] = defaultdict(list)
        for r in self._records:
            grouped[r.date].append(r)

        result: dict[date, DailySummary] = {}
        for d, recs in sorted(grouped.items()):
            result[d] = DailySummary(
                date=d,
                total_engagement=sum(r.engagement.total for r in recs),
                total_impressions=sum(r.reach.impressions for r in recs),
            )
        return result

    def overall(self) -> OverallSummary:
        channel_data = self.by_channel()
        total_spend    = round(sum(c.total_spend for c in channel_data.values()), 2)
        total_revenue  = round(sum(c.total_revenue for c in channel_data.values()), 2)
        total_impress  = sum(c.total_impressions for c in channel_data.values())
        total_engage   = sum(c.total_engagement for c in channel_data.values())
        total_conv     = sum(c.total_conversions for c in channel_data.values())
        total_clicks   = sum(c.total_clicks for c in channel_data.values())

        overall_roi = round((total_revenue - total_spend) / total_spend * 100, 2) if total_spend else 0.0
        overall_ctr = round(total_clicks / total_impress * 100, 4) if total_impress else 0.0

        return OverallSummary(
            total_spend=total_spend,
            total_revenue=total_revenue,
            total_impressions=total_impress,
            total_engagement=total_engage,
            total_conversions=total_conv,
            overall_roi=overall_roi,
            overall_ctr=overall_ctr,
            best_roi_channel=self.top_channel_by("roi", channel_data),
            best_ctr_channel=self.top_channel_by("ctr", channel_data),
            best_reach_channel=self.top_channel_by("reach", channel_data),
            best_engagement_channel=self.top_channel_by("engagement", channel_data),
            best_conversion_channel=self.top_channel_by("conversions", channel_data),
        )

    def top_channel_by(
        self,
        metric: str,
        channel_data: Optional[dict[Channel, ChannelSummary]] = None,
    ) -> Channel:
        if channel_data is None:
            channel_data = self.by_channel()
        metric_map = {
            "roi":         lambda c: c.avg_roi,
            "ctr":         lambda c: c.avg_ctr,
            "reach":       lambda c: c.total_impressions,
            "engagement":  lambda c: c.total_engagement,
            "conversions": lambda c: c.total_conversions,
        }
        if metric not in metric_map:
            raise ValueError(f"Unknown metric '{metric}'. Choose from: {list(metric_map)}")
        return max(channel_data.values(), key=metric_map[metric]).channel


# ---------------------------------------------------------------------------
# Dashboard Renderer
# ---------------------------------------------------------------------------

class DashboardRenderer:
    WIDTH = 80

    def __init__(self, aggregator: MetricsAggregator, start: date, end: date):
        self.aggregator = aggregator
        self.start = start
        self.end = end
        self._stream = sys.stdout

    def render(self, stream=None) -> None:
        self._stream = stream or sys.stdout
        self._render_header()
        self._render_overall_summary()
        self._render_channel_breakdown()
        self._render_kpi_highlights()
        self._render_trend_sparkline()
        self._render_footer()

    # --- Section renderers ---

    def _render_header(self):
        w = self.WIDTH
        self._line("=" * w)
        title = f"MARKETING ANALYTICS DASHBOARD  |  {self.start} to {self.end}"
        self._line(title.center(w))
        self._line("=" * w)
        self._line("")

    def _render_overall_summary(self):
        s = self.aggregator.overall()
        lines = [
            f"  Total Spend:       ${s.total_spend:>12,.2f}    "
            f"Total Revenue:    ${s.total_revenue:>12,.2f}",
            f"  Overall ROI:       {s.overall_roi:>11.2f}%    "
            f"Overall CTR:       {s.overall_ctr:>10.4f}%",
            f"  Total Impressions: {s.total_impressions:>12,}    "
            f"Total Conversions: {s.total_conversions:>10,}",
            f"  Total Engagement:  {s.total_engagement:>12,}",
        ]
        self._box("OVERALL PERFORMANCE SUMMARY", lines)
        self._line("")

    def _render_channel_breakdown(self):
        channel_data = self.aggregator.by_channel()
        # Columns sized to fit exactly within WIDTH-4 = 76 chars
        header = (
            f"  {'Channel':<12} {'Impressions':>12} {'Engagement':>11}"
            f" {'Clicks':>8} {'CTR%':>7} {'ROI%':>8} {'Spend':>10}"
        )
        sep = "  " + "-" * 74
        rows = [header, sep]
        for ch in Channel:
            c = channel_data.get(ch)
            if c is None:
                continue
            rows.append(
                f"  {c.channel.value:<12}"
                f" {c.total_impressions:>12,}"
                f" {c.total_engagement:>11,}"
                f" {c.total_clicks:>8,}"
                f" {c.avg_ctr:>6.2f}%"
                f" {c.avg_roi:>7.1f}%"
                f" ${c.total_spend:>9,.0f}"
            )
        self._box("CHANNEL BREAKDOWN", rows)
        self._line("")

    def _render_kpi_highlights(self):
        s = self.aggregator.overall()
        ch = self.aggregator.by_channel()

        best_roi  = ch[s.best_roi_channel]
        best_ctr  = ch[s.best_ctr_channel]
        best_reach = ch[s.best_reach_channel]
        best_eng  = ch[s.best_engagement_channel]
        best_conv = ch[s.best_conversion_channel]

        lines = [
            f"  Best ROI:          {s.best_roi_channel.value:<14}  ({best_roi.avg_roi:.1f}%)",
            f"  Best CTR:          {s.best_ctr_channel.value:<14}  ({best_ctr.avg_ctr:.2f}%)",
            f"  Best Reach:        {s.best_reach_channel.value:<14}  ({best_reach.total_impressions:,} impressions)",
            f"  Best Engagement:   {s.best_engagement_channel.value:<14}  ({best_eng.total_engagement:,} interactions)",
            f"  Best Conversions:  {s.best_conversion_channel.value:<14}  ({best_conv.total_conversions:,} conversions)",
        ]
        self._box("KPI HIGHLIGHTS", lines)
        self._line("")

    def _render_trend_sparkline(self):
        daily = self.aggregator.by_date()
        if not daily:
            return

        all_dates = sorted(daily.keys())
        # Sample at most 10 evenly spaced dates for readability
        step = max(1, len(all_dates) // 10)
        sampled = all_dates[::step]

        max_eng = max(daily[d].total_engagement for d in sampled) or 1
        bar_width = 30

        lines = []
        for d in sampled:
            ds = daily[d]
            bar = self._bar(ds.total_engagement, max_eng, bar_width)
            lines.append(f"  {d.strftime('%b %d')}  {bar}  {ds.total_engagement:,}")
        self._box("DAILY ENGAGEMENT TREND", lines)
        self._line("")

    def _render_footer(self):
        w = self.WIDTH
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self._line("=" * w)
        footer = f"Generated: {timestamp}  |  Data Source: Simulated"
        self._line(footer.center(w))
        self._line("=" * w)

    # --- Helpers ---

    def _box(self, title: str, lines: list[str]) -> None:
        w = self.WIDTH
        self._line("+" + "-" * (w - 2) + "+")
        self._line("| " + title.ljust(w - 4) + " |")
        self._line("+" + "-" * (w - 2) + "+")
        for line in lines:
            # Truncate or pad to fit inside box
            content = line.ljust(w - 4)[: w - 4]
            self._line("| " + content + " |")
        self._line("+" + "-" * (w - 2) + "+")

    def _bar(self, value: float, max_value: float, width: int = 30) -> str:
        filled = int(width * value / max_value) if max_value else 0
        filled = min(filled, width)
        return "[" + "#" * filled + "-" * (width - filled) + "]"

    def _line(self, text: str) -> None:
        print(text, file=self._stream)


# ---------------------------------------------------------------------------
# Facade
# ---------------------------------------------------------------------------

class MarketingAnalyticsDashboard:
    """Orchestrates data fetching, aggregation, and rendering."""

    def __init__(
        self,
        data_source: DataSource = None,
        start: date = None,
        end: date = None,
    ):
        from social_media_marketing import SocialMediaMarketing
        self._smm   = SocialMediaMarketing()
        self._src   = data_source or SimulatedDataSource()
        self._start = start or date(2025, 1, 1)
        self._end   = end   or date(2025, 1, 31)
        if self._start > self._end:
            raise ValueError("start date must be before end date")

    # Tool management delegated to existing class
    def add_tool(self, tool: str) -> None:
        self._smm.add_tool(tool)

    def list_tools(self) -> list[str]:
        return self._smm.list_tools()

    def run(self) -> None:
        """Fetch data, aggregate, and render dashboard to stdout."""
        records    = self._src.fetch(self._start, self._end)
        aggregator = MetricsAggregator(records)
        renderer   = DashboardRenderer(aggregator, self._start, self._end)
        renderer.render()

    def export_report(self, filepath: str) -> None:
        """Write the dashboard report to a text file."""
        import io
        records    = self._src.fetch(self._start, self._end)
        aggregator = MetricsAggregator(records)
        renderer   = DashboardRenderer(aggregator, self._start, self._end)
        with open(filepath, "w", encoding="utf-8") as f:
            renderer.render(stream=f)
        print(f"Report exported to: {filepath}")


# ---------------------------------------------------------------------------
# Entry Point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    dashboard = MarketingAnalyticsDashboard(
        start=date(2025, 1, 1),
        end=date(2025, 1, 31),
    )
    dashboard.add_tool("Buffer")
    dashboard.add_tool("Hootsuite")
    print(f"Registered tools: {dashboard.list_tools()}\n")
    dashboard.run()
