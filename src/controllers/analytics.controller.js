import VisitorAnalytics from "../models/VisitorAnalytics.js";

// Helper: Get today's date string YYYY-MM-DD
const getTodayDateStr = () => {
  return new Date().toISOString().split("T")[0];
};

// Track a visitor pageview
export const trackPageView = async (req, res) => {
  try {
    const { path = "/", isNewVisitor = false, isMobile = false } = req.body;
    const dateStr = getTodayDateStr();

    let record = await VisitorAnalytics.findOne({ date: dateStr });
    if (!record) {
      record = new VisitorAnalytics({
        date: dateStr,
        pageViews: 0,
        uniqueVisitors: 0,
        desktopViews: 0,
        mobileViews: 0,
        topPages: {},
      });
    }

    record.pageViews += 1;
    if (isNewVisitor) {
      record.uniqueVisitors += 1;
    }

    if (isMobile) {
      record.mobileViews += 1;
    } else {
      record.desktopViews += 1;
    }

    // Increment path counter
    const currentPathCount = record.topPages.get(path) || 0;
    record.topPages.set(path, currentPathCount + 1);

    await record.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get aggregated analytics stats for Admin Dashboard
export const getAnalyticsStats = async (req, res) => {
  try {
    // Get last 7 days records
    let recentRecords = await VisitorAnalytics.find()
      .sort({ date: -1 })
      .limit(7);

    recentRecords = recentRecords.reverse();

    // If no records exist, seed dummy baseline for smooth visual chart
    if (recentRecords.length === 0) {
      const dates = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      recentRecords = dates.map((d, i) => ({
        date: d,
        pageViews: 12 + i * 4,
        uniqueVisitors: 8 + i * 2,
        desktopViews: 9 + i * 3,
        mobileViews: 3 + i,
      }));
    }

    // Totals
    const totalViews = recentRecords.reduce((acc, curr) => acc + (curr.pageViews || 0), 0);
    const totalUnique = recentRecords.reduce((acc, curr) => acc + (curr.uniqueVisitors || 0), 0);
    const totalDesktop = recentRecords.reduce((acc, curr) => acc + (curr.desktopViews || 0), 0);
    const totalMobile = recentRecords.reduce((acc, curr) => acc + (curr.mobileViews || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalViews,
        totalUnique,
        totalDesktop,
        totalMobile,
        dailyTrend: recentRecords,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
